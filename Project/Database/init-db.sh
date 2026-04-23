#!/bin/bash
set -euo pipefail

DB_NAME="CreateYourselfDB"
SA_PASSWORD="${MSSQL_SA_PASSWORD:-${SQLCMDPASSWORD:-}}"

if [[ -z "${SA_PASSWORD}" ]]; then
    echo "Missing MSSQL_SA_PASSWORD or SQLCMDPASSWORD for database initialization." >&2
    exit 1
fi

SQLCMD=(/opt/mssql-tools18/bin/sqlcmd -S database -U sa -P "${SA_PASSWORD}" -C -b)

echo "Waiting for SQL Server to become available..."
until "${SQLCMD[@]}" -Q "SELECT 1" >/dev/null 2>&1; do
    sleep 2
done

echo "Ensuring database ${DB_NAME} exists..."
"${SQLCMD[@]}" -Q "IF DB_ID('${DB_NAME}') IS NULL BEGIN CREATE DATABASE [${DB_NAME}] END"

echo "Waiting for database ${DB_NAME} to become online..."
until [[ "$("${SQLCMD[@]}" -h -1 -W -Q "SET NOCOUNT ON; SELECT state_desc FROM sys.databases WHERE name = '${DB_NAME}'")" == "ONLINE" ]]; do
    sleep 2
done

echo "Checking for legacy schema drift..."
LEGACY_SCHEMA="$(${SQLCMD[@]} -d "${DB_NAME}" -h -1 -W -Q "SET NOCOUNT ON;
IF OBJECT_ID('dbo.Portfolio', 'U') IS NOT NULL
   AND (
       COL_LENGTH('dbo.Portfolio', 'current_theme_id') IS NULL
       OR COL_LENGTH('dbo.Portfolio', 'current_version_id') IS NULL
       OR COL_LENGTH('dbo.Portfolio', 'description') IS NULL
       OR COL_LENGTH('dbo.Project', 'description') IS NULL
       OR COL_LENGTH('dbo.Skill', 'description') IS NULL
       OR COL_LENGTH('dbo.Experience', 'description') IS NULL
   )
    SELECT '1'
ELSE
    SELECT '0'")"

if [[ "${LEGACY_SCHEMA}" == "1" ]]; then
    echo "Legacy schema detected. Recreating ${DB_NAME} so the current schema can be applied cleanly."
    "${SQLCMD[@]}" -d master -Q "ALTER DATABASE [${DB_NAME}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [${DB_NAME}]; CREATE DATABASE [${DB_NAME}]"

    echo "Waiting for recreated database ${DB_NAME} to become online..."
    until [[ "$("${SQLCMD[@]}" -h -1 -W -Q "SET NOCOUNT ON; SELECT state_desc FROM sys.databases WHERE name = '${DB_NAME}'")" == "ONLINE" ]]; do
        sleep 2
    done
fi

echo "Checking whether schema is already initialized..."
if "${SQLCMD[@]}" -d "${DB_NAME}" -h -1 -W -Q "SET NOCOUNT ON; SELECT 1 FROM sys.tables WHERE name = 'UserRefreshToken'" | grep -qx "1"; then
    exit 0
fi

echo "Applying schema initialization script..."
"${SQLCMD[@]}" -i /init/CreateYourselfDB.sql

echo "Verifying schema initialization..."
"${SQLCMD[@]}" -d "${DB_NAME}" -Q "IF OBJECT_ID('dbo.UserRefreshToken', 'U') IS NULL BEGIN THROW 50000, 'Schema initialization failed.', 1 END"