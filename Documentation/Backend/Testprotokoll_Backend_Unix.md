# Testprotokoll Backend Unix Testing

**Getestet mit:** Postman  
**Backend-URL:** `http://localhost:3000`  
**Datum:** 19.05.2026  
**Tester:** Egor

---

# Zusammenfassung

Das Backend wurde manuell mit Postman getestet.  
Getestet wurden:

- Authentifizierung
- Portfolio-Routen
- Project-Modul
- Skill-Modul
- Bild-Upload
- Fehlerbehandlung
- Token-Handling

Die wichtigsten Happy Paths sowie zentrale Fehlerfälle wurden überprüft.

---

# Testergebnisse

| Nr. | Bereich          | Request                                         | Testfall                      | Erwartet                           | Ergebnis                | Status        | Zuständig   |
| --- | ---------------- | ----------------------------------------------- | ----------------------------- | ---------------------------------- | ----------------------- | ------------- | ----------- |
| 1   | Auth             | POST `/users/register`                          | Neuer Benutzer                | 201                                | 201                     | OK            | gian        |
| 2   | Auth             | POST `/users/register`                          | Doppelte E-Mail               | 409                                | 409                     | OK            | gian        |
| 3   | Auth             | POST `/users/login`                             | Erfolgreicher Login           | 200/201                            | 201                     | OK            | gian        |
| 4   | Auth             | POST `/users/login`                             | Falsches Passwort             | 401                                | 401                     | OK            | gian        |
| 5   | Auth             | GET `/portfolios`                               | Ohne Token                    | 401                                | 401                     | OK            | gian        |
| 6   | Auth             | GET `/portfolios`                               | Ungültiger Token              | 403                                | 403                     | OK            | gian        |
| 7   | Portfolio        | POST `/portfolio`                               | Portfolio erstellen           | 201                                | 201                     | OK            | gian        |
| 8   | Portfolio        | POST `/portfolio`                               | Doppelter Slug                | 409                                | 409                     | OK            | gian / egor |
| 9   | Portfolio        | GET `/portfolios`                               | Eigene Portfolios abrufen     | 200                                | 200                     | OK            | gian        |
| 10  | Portfolio        | GET `/portfolio/:id`                            | Einzelnes Portfolio lesen     | 200                                | 200                     | OK            | gian        |
| 11  | Portfolio        | GET `/portfolio/:id/full`                       | Vollständiges Portfolio lesen | 200                                | 200                     | OK            | gian        |
| 12  | Portfolio        | PUT `/portfolio/:id`                            | Portfolio aktualisieren       | 200                                | 200                     | OK            | gian        |
| 13  | Portfolio        | GET `/portfolio/999999`                         | Nicht vorhandenes Portfolio   | 404                                | 404                     | OK            | gian        |
| 14  | Project          | POST `/portfolio/:id/projects`                  | Projekt erstellen             | 201                                | 201                     | OK            | gian        |
| 15  | Project          | POST `/portfolio/:id/projects`                  | Ungültige URL                 | 400 erwartet                       | 201 erhalten            | FEHLER        | gian        |
| 16  | Project          | POST `/portfolio/:id/projects`                  | Ungültiger Datumsbereich      | 400 erwartet                       | 201 erhalten            | FEHLER        | gian        |
| 17  | Project          | PUT `/portfolio/:id/projects/:projectId`        | Projekt aktualisieren         | 200                                | 200                     | OK            | gian        |
| 18  | Project          | PUT `/portfolio/:id/projects/999999`            | Nicht vorhandenes Projekt     | 404                                | 404                     | OK            | gian        |
| 19  | Upload           | POST `/portfolio/:id/projects/:projectId/image` | JPG/PNG Upload                | 200 erwartet                       | 400 erhalten            | FEHLER        | gian        |
| 20  | Upload           | POST `/portfolio/:id/projects/:projectId/image` | Upload ohne Datei             | 400                                | 400                     | OK            | gian        |
| 21  | Skills           | POST `/portfolio/:id/skills`                    | Skill-Level ungültig/gültig   | 400 bei falschem Typ, 201 bei Zahl | korrekt                 | OK            | gian        |
| 22  | Skills           | POST `/portfolio/:id/skills`                    | Doppelter Skill               | 409                                | 409                     | OK            | gian / egor |
| 23  | Skills           | PUT `/portfolio/:id/skills/:skillId`            | Skill aktualisieren           | 200                                | 200                     | OK            | gian        |
| 24  | Skills           | DELETE `/portfolio/:id/skills/:skillId`         | Skill löschen                 | 204                                | 204                     | OK            | gian        |
| 25  | Fehlerbehandlung | GET unbekannte Route                            | Nicht vorhandene Route        | 404                                | 404                     | OK            | gian        |
| 26  | Fehlerbehandlung | Ungültiges JSON senden                          | Fehlerhafte JSON-Daten        | 400                                | 400                     | OK            | gian        |
| 27  | Cleanup          | DELETE `/portfolio/:id/projects/:projectId`     | Projekt löschen               | 204                                | 204                     | OK            | gian        |
| 28  | Cleanup          | DELETE `/portfolio/:id`                         | Portfolio löschen             | 204 erwartet                       | 500 erhalten            | FEHLER        | gian / egor |
| 29  | Cleanup          | GET gelöschtes Portfolio                        | Nach Löschung prüfen          | nicht testbar                      | Serverfehler in Test 28 | NICHT TESTBAR | -           |
| 30  | Auth             | POST `/token` nach Logout                       | Refresh nach Logout           | 404/401/403                        | 404                     | OK            | gian        |
| 31  | Auth             | POST `/token`                                   | Refresh Token gültig          | 200                                | 200                     | OK            | gian        |
| 32  | Auth             | DELETE `/users/logout`                          | Logout                        | 200                                | 200                     | OK            | gian        |
| 33  | Auth             | POST `/token`                                   | Refresh nach Logout           | 400                                | 400                     | OK            | gian        |

---

# Gefundene Probleme

## 1. Fehlende URL-Validierung bei Projects

Beim Erstellen eines Projekts wurden ungültige URLs akzeptiert.  
Erwartet wurde ein `400 Bad Request`, tatsächlich wurde `201 Created` zurückgegeben.

---

## 2. Fehlende Datumsvalidierung bei Projects

Ein Projekt mit Enddatum vor Startdatum wurde akzeptiert.

Erwartet:

- `400 Bad Request`

Erhalten:

- `201 Created`

---

## 3. Bild-Upload schlägt bei JPG und PNG fehl

Sowohl JPG- als auch PNG-Dateien wurden mit `400` abgelehnt.

---

## 4. Portfolio-Löschung erzeugt Serverfehler

Beim Löschen eines Portfolios wurde `500 Internal Server Error` zurückgegeben.

---

# Fazit

Die grundlegenden Authentifizierungs- und Portfoliofunktionen funktionieren korrekt.  
Auch die meisten CRUD-Operationen der Module arbeiten erwartungsgemäss.

Es wurden jedoch mehrere Probleme festgestellt:

- fehlende Validierungen bei Projects
- fehlerhafter Bild-Upload
- Serverfehler beim Löschen eines Portfolios

Diese Probleme sollten vor produktivem Einsatz behoben werden.
