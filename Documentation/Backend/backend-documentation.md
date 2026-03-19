# Backend Documentation Overview

## Projektziel Backend

### Beschreibung
Das Backend dient als zentrale Schnittstelle für die Verarbeitung von Daten.
Durch API endpunkte ermöglicht es die sichere Kommunikation zwischen Frontend und der Datenbank.

### Verantwortungen Backend
- Sicheres Login und Authentifizierung der Benutzer
- Verwaltung von Benutzerdaten
- Fehlerbehandlung für Standardfälle
- Vorbereitung für spätere Datenbank- und JWT-Integration

### Hauptfunktionen 
Benutzerdatenverwaltung und Speichern in der Datenbank:
    - Name, Email, Passwort
    - Portfolio Daten

## Übersicht
- Projektziel Backend
    - Ein übersichtliches, verständliches und simples Backend mit klaren Schnittstellen und Funktionen, um die Anforderungen des Projekts zu erfüllen.

- Technologien
    - Node.js mit Express für die Serverlogik
    - Docker für die Containerisierung
    - JWT für die Authentifizierung
    - bcrypt für die Passwortsicherheit
    - Multer für den Umgang mit Mediendateien (wie PNG oder PDF-Uploads)
    - MS SQL für die Datenbank
   
- Modulübersicht
    - Authentifizierungsmodul: Verantwortlich für die Registrierung, Anmeldung, Abmeldung und Token-Management der Benutzer.
    - Portfolio-Verwaltungsmodul: Verantwortlich für die Erstellung, Bearbeitung, Anzeige und Löschung von Portfolios.

- API-Endpunkte
    Port 4000 for Authentication:
    /users/register
    /users/login
    /users/logout
    /token *For Refreshing JWT Tokens*

    Port 3000 for Portfolio Management:
    /portfolios (GET, POST, PUT, DELETE)

- Funktionsliste
    - Benutzerverwaltung der Serveradministratoren
    - Übersichetliche API-Endpunkte für die Portfolio-Verwaltung

- Datenbankbezug
    - warte noch auf die Datenbank-Schemas, um die genauen Tabellen und Beziehungen zu verstehen

- Sicherheitskonzept
    - Passwort-Hashing mit bcrypt
    - JWT für die Authentifizierung und Autorisierung
    - Authentication Tokens sind gültig für 15 minuten, Refresh Tokens für einen Monat.
    - Rate-Limiting der IP-Adressen für API-Endpunkte, um Brute-Force-Angriffe zu verhindern
    - Eingabevalidierung, um SQL-Injection und andere Angriffe zu verhindern

- Fehlerbehandlung
    - alle Benutzer eingaben werden zuerst validiert, bevor sie verarbeitet werden
    - Fehler werden mit klaren Statuscodes und Nachrichten zurückgegeben

