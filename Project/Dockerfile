FROM node:20-bookworm-slim AS node_runtime

FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y \
    MSSQL_PID=Developer \
    MSSQL_SA_PASSWORD=YourStrong!Passw0rd \
    DB_SERVER=localhost \
    DB_PORT=1433 \
    DB_NAME=CreateYourselfDB \
    DB_USER=sa \
    DB_PASSWORD=YourStrong!Passw0rd \
    DB_ENCRYPT=false \
    DB_TRUST_SERVER_CERTIFICATE=true \
    PORT=3000 \
    FRONTEND_PORT=5173 \
    CHOKIDAR_USEPOLLING=true

USER root

COPY --from=node_runtime /usr/local /usr/local

WORKDIR /opt/createyourself

COPY Backend/package.json Backend/package-lock.json ./Backend/
RUN cd Backend && npm ci --omit=dev

COPY Frontend/createYourself/package.json Frontend/createYourself/package-lock.json ./Frontend/createYourself/
RUN cd Frontend/createYourself && npm ci

COPY Backend ./Backend
COPY Frontend/createYourself ./Frontend/createYourself
COPY Database/CreateYourselfDB.sql ./Database/CreateYourselfDB.sql

COPY docker/single-image-init-db.sh /usr/local/bin/single-image-init-db.sh
COPY docker/single-image-entrypoint.sh /usr/local/bin/single-image-entrypoint.sh

RUN chmod +x /usr/local/bin/single-image-init-db.sh /usr/local/bin/single-image-entrypoint.sh \
    && mkdir -p /opt/createyourself/Backend/uploads/projects \
    && mkdir -p /opt/createyourself/Backend/uploads/profiles \
    && mkdir -p /opt/createyourself/Backend/uploads/modules

EXPOSE 1433 3000 5173

ENTRYPOINT ["/usr/local/bin/single-image-entrypoint.sh"]
