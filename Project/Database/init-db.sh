#!/bin/bash
set -euo pipefail

DB_NAME="CreateYourselfDB"
SQLCMD=(/opt/mssql-tools18/bin/sqlcmd -S database -U sa -P "${MSSQL_SA_PASSWORD}" -C -b)

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

echo "Checking whether schema is already initialized..."
if "${SQLCMD[@]}" -d "${DB_NAME}" -h -1 -W -Q "SET NOCOUNT ON; SELECT 1 FROM sys.tables WHERE name = 'UserRefreshToken'" | grep -qx "1"; then
    exit 0
fi

echo "Applying schema initialization script..."
"${SQLCMD[@]}" -i /init/CreateYourselfDB.sql

echo "Verifying schema initialization..."
"${SQLCMD[@]}" -d "${DB_NAME}" -Q "IF OBJECT_ID('dbo.UserRefreshToken', 'U') IS NULL BEGIN THROW 50000, 'Schema initialization failed.', 1 END"