# Fehlerbehandlung

## Konzept
- Einheitliche Fehlerstruktur
- Fehler einheitlich bearbeiten (Middleware)

## Fehlerformat
```json
{
  "error": true,
  "message": "Fehlerbeschreibung",
  "code": 400
}
```

## Mögliche Fehlercodes
| Fehlercode | Bedeutung |
| --- | --- |
| 400 | Ungültige Anfrage |
| ... | ... |