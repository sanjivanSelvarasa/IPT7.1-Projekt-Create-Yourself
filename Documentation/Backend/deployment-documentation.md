# Deployment-Dokumentation – CreateYourself Frontend

## Übersicht

Dieses Dokument beschreibt den Deployment-Prozess der Frontend-Anwendung **CreateYourself** mithilfe von Docker und einer privaten Container Registry.

---

## Voraussetzungen

Vor dem Deployment müssen folgende Voraussetzungen erfüllt sein:

* Docker ist installiert.
* Zugriff auf die private Registry (`registry.gian.ink`).
* Gültige Zugangsdaten für die Docker Registry.
* Zugriff auf den Zielserver.

---

## Projektstruktur

```text
Project/
└── Frontend/
    └── createYourself/
        ├── Dockerfile
        ├── Dockerfile.dev
        ├── package.json
        ├── vite.config.ts
        ├── src/
        └── ...
```

---

## Lokale Entwicklung

Für die lokale Entwicklung wird die Anwendung über den Vite-Entwicklungsserver gestartet.

### In das Projektverzeichnis wechseln

```bash
cd Project/Frontend/createYourself
```

### Docker-Image erstellen

```bash
docker build -t createyourself .
```

### Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist anschliessend unter folgender Adresse erreichbar:

```text
http://localhost:5173
```

---

## Deployment für die Produktivumgebung

### Docker-Image erstellen

Zuerst wird das aktuelle Frontend-Projekt in ein Docker-Image verpackt:

```bash
docker build -t registry.gian.ink/createyourself:latest .
```

---

## Anmeldung an der Docker Registry

Vor dem Hochladen des Images muss eine Anmeldung an der privaten Registry erfolgen:

```bash
docker login registry.gian.ink
```

Anschliessend werden die bereitgestellten Zugangsdaten eingegeben.

---

## Docker-Image hochladen

Das erstellte Image wird in die private Registry hochgeladen:

```bash
docker push registry.gian.ink/createyourself:latest
```

---

## Deployment auf dem Server

Auf dem Zielserver wird die aktuelle Version des Images heruntergeladen:

```bash
docker pull registry.gian.ink/createyourself:latest
```

Der Server verwendet anschliessend dieses Image, um die neueste Version der Anwendung bereitzustellen.

---

## Deployment überprüfen

Zur Kontrolle können die aktuell laufenden Docker-Container angezeigt werden:

```bash
docker ps
```

Falls Probleme auftreten, können die Container-Logs eingesehen werden:

```bash
docker logs createyourself
```

Nach erfolgreichem Deployment ist die Anwendung über die konfigurierte Domain erreichbar:

```text
https://create-yourself.gian.ink
```

---

## Aktualisierung der Anwendung

Werden Änderungen am Frontend vorgenommen, muss der Deployment-Prozess erneut durchgeführt werden.

### Neues Docker-Image erstellen

```bash
docker build -t registry.gian.ink/createyourself:latest .
```

### Aktualisiertes Image hochladen

```bash
docker push registry.gian.ink/createyourself:latest
```

### Neueste Version auf dem Server herunterladen

```bash
docker pull registry.gian.ink/createyourself:latest
```

---

## Fehlerbehebung

### Laufende Docker-Container anzeigen

```bash
docker ps
```

### Container-Logs anzeigen

```bash
docker logs createyourself
```

### Vorhandene Docker-Images auflisten

```bash
docker images
```

### Verbindung zur Docker Registry überprüfen

```bash
docker login registry.gian.ink
```

---

## Zusammenfassung

Der Deployment-Prozess umfasst die folgenden Schritte:

1. In das Frontend-Projektverzeichnis wechseln.
2. Das Docker-Image erstellen.
3. An der privaten Docker Registry anmelden.
4. Das Docker-Image in die Registry hochladen.
5. Das aktuelle Image auf dem Zielserver herunterladen.
6. Das Deployment überprüfen und die Anwendung testen.

Nach erfolgreicher Durchführung dieser Schritte steht die aktuelle Version von **CreateYourself** über die konfigurierte Domain zur Verfügung.
