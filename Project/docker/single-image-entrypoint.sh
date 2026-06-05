#!/usr/bin/env bash
set -euo pipefail


SQL_PID=""
BACKEND_PID=""
FRONTEND_PID=""

ensure_sql_storage() {
    local sql_root="/var/opt/mssql"

    mkdir -p "${sql_root}" \
        "${sql_root}/data" \
        "${sql_root}/log" \
        "${sql_root}/secrets" \
        "${sql_root}/backup"

    if [[ "$(id -u)" == "0" ]]; then
        chown -R 10001:0 "${sql_root}"
        chmod 770 "${sql_root}" \
            "${sql_root}/data" \
            "${sql_root}/log" \
            "${sql_root}/secrets" \
            "${sql_root}/backup"
    fi
}

cleanup() {
    local exit_code=$?

    for pid in "${FRONTEND_PID}" "${BACKEND_PID}" "${SQL_PID}"; do
        if [[ -n "${pid}" ]] && kill -0 "${pid}" >/dev/null 2>&1; then
            kill "${pid}" >/dev/null 2>&1 || true
        fi
    done

    wait || true
    exit "${exit_code}"
}

trap cleanup SIGINT SIGTERM EXIT

echo "Preparing SQL Server storage..."
ensure_sql_storage

echo "Starting SQL Server..."
/opt/mssql/bin/sqlservr &
SQL_PID=$!

echo "Initializing database..."
/usr/local/bin/single-image-init-db.sh

echo "Starting backend..."
(
    cd /opt/createyourself/Backend
    node app.js
) &
BACKEND_PID=$!

echo "Starting frontend..."
(
    cd /opt/createyourself/Frontend/createYourself
    npm run dev -- --host 0.0.0.0 --port "${FRONTEND_PORT:-5173}"
) &
FRONTEND_PID=$!

wait -n "${SQL_PID}" "${BACKEND_PID}" "${FRONTEND_PID}"
