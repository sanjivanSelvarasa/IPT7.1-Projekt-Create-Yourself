# Verwendete Technologien

| Bereich | Technologie | Zweck |
| --- | --- | --- |
| Runtime | Node.js | JavaScript-Ausführungsumgebung |
| Framework | Express.js | API, Routing und Middleware-Pipeline |
| Datenbank | MS SQL Server | Persistente Speicherung von User-/Portfolio-Daten |
| DB-Treiber | mssql | SQL-Abfragen aus Node.js gegen MS SQL |
| Authentifizierung | jsonwebtoken (JWT) | Access- und Refresh-Token-basierte Auth |
| Sicherheit | bcrypt | Passwort-Hashing und Verifikation |
| Upload | multer | Verarbeitung von multipart/form-data (Bilder) |
| Konfiguration | dotenv | Laden von Umgebungsvariablen aus .env |
| Containerisierung | Docker + Docker Compose | Backend, DB und Init-Prozess als Services |