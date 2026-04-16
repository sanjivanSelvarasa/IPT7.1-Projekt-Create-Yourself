### Sicherheitsmassnahmen

#### Authentifizierung
- JWT Token wird verwendet
- Token wird im Header gespeichert
- Access Token schützt alle Portfolio- und Modul-Endpunkte

#### Passwortsicherheit
- Hashing mit bcrypt
- Mindestlänge: 6 Zeichen

#### Zugriffskontrolle
- Benutzer darf nur eigene Daten bearbeiten
- Ownership-Prüfung über zentralen Access-Helper (`getOwnedPortfolio`)
- Fremde Portfolios liefern `403 Forbidden`

#### Schutz vor Angriffen
- Parameterisierte SQL-Abfragen mit `mssql` (`.input(...)`)
- Eingabevalidierung für IDs, Texte, URLs und Datumsfelder
- Upload-Validierung für Dateityp und Dateigröße

#### Datenschutz
- Keine Speicherung von Klartext-Passwörtern
- Minimierung sensibler Daten
- Tokens werden serverseitig für Logout/Refresh verwaltet (Refresh Token Tabelle)

#### API Sicherheit
- Input Validation
- Einheitliche Fehlerantworten ohne Stacktraces an Clients
- API Rate Limiting ist aktuell noch nicht implementiert