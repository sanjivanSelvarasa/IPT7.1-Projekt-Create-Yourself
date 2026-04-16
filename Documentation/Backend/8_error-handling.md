# Fehlerbehandlung

## ApiError-Klasse

Alle erwarteten Fehler im Backend werden über eine eigene `ApiError`-Klasse geworfen. Sie erweitert die native `Error`-Klasse um einen HTTP-Statuscode und optionale Details.

```js
class ApiError extends Error {
    constructor(status, message, details) {
        super(message)
        this.status = status
        this.details = details
    }
}
```

**Felder:**
- `status` — HTTP-Statuscode (z. B. `404`)
- `message` — Lesbare Fehlerbeschreibung
- `details` *(optional)* — Zusätzliche Informationen zum Fehler

## Globale Fehler-Middleware

Alle geworfenen `ApiError`-Instanzen werden von einer zentralen Express-Fehler-Middleware abgefangen. Diese gibt eine einheitliche JSON-Antwort zurück:

```json
{
  "error": "Fehlerbeschreibung"
}
```

Bei `status === 500` wird stattdessen `"Internal server error."` zurückgegeben und der Fehler serverseitig geloggt (`console.error`).

Wenn das Feld `details` gesetzt ist, wird es ebenfalls in der Antwort mitgeschickt:

```json
{
  "error": "Fehlerbeschreibung",
  "details": "..."
}
```

Ungültige JSON-Bodies (Syntaxfehler) werden separat abgefangen und mit folgendem Response beantwortet:

```json
{
  "error": "Malformed JSON body."
}
```

## Upload-Fehler (Multer)

Datei-Upload-Fehler werden zentral auf klare API-Fehler gemappt:

- Datei zu groß (`LIMIT_FILE_SIZE`) -> `400`
  - `"Die Bilddatei ist zu groß. Maximal 5 MB sind erlaubt."`
- Falscher Dateityp / unerwartetes Feld (`LIMIT_UNEXPECTED_FILE`) -> `400`
  - `"Ungültige Datei. Es sind nur Bilddateien erlaubt."`
- Sonstige Upload-Fehler -> `400`
  - `"Datei-Upload fehlgeschlagen."`

## Typische Fachfehler

- `400 Bad Request`
  - Ungültige ID, fehlende Pflichtfelder, falsches Datumsformat, ungültige URL
- `401 Unauthorized`
  - Kein Access Token übermittelt
- `403 Forbidden`
  - Ungültiger/abgelaufener Token oder Zugriff auf fremde Ressourcen
- `404 Not Found`
  - Portfolio/Projekt/Modul-Eintrag nicht gefunden
- `409 Conflict`
  - Eindeutigkeitskonflikte (z. B. E-Mail oder Slug bereits vorhanden)

## Fehlercodes

Die pro Endpunkt möglichen Statuscodes sind in der [API-Endpoints Dokumentation](./4_api-endpoints.md) aufgelistet.