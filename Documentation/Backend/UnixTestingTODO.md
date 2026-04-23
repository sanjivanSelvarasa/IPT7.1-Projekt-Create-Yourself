# Unix Testing TODO

## Zustaendigkeit bei Fehlern

- Wenn Fehler im Backend-Code gefunden werden, also in Routen, Middleware, Controllern, Services oder API-Responses: an **gian** wenden.
- Wenn Fehler in SQL, Datenbankstruktur, SQL-Skripten oder Datenbankbeziehungen gefunden werden: an **egor** wenden.

## Aktueller Backend-Umfang

Das aktuelle Backend deckt diese Bereiche ab:

- Auth
  - `POST /users/register`
  - `POST /users/login`
  - `DELETE /users/logout`
  - `POST /token`
  - `GET /users`
- Portfolio
  - `GET /portfolios`
  - `POST /portfolio`
  - `GET /portfolio/:id`
  - `GET /portfolio/:id/full`
  - `PUT /portfolio/:id`
  - `DELETE /portfolio/:id`
- Module innerhalb eines Portfolios
  - Projects
  - Skills
  - Social Links
  - Experiences
  - Educations
- Projektbild-Upload
  - `POST /portfolio/:id/projects/:projectId/image`

Backend-URL:

```bash
http://localhost:3000
```

```

Hinweis: Im aktuellen Backend gibt es noch keinen Test-Runner und kein `npm test`-Script. Die Testumgebung muss also noch separat eingerichtet werden.

## Vorhandene Example-Request-Dateien

Die beiden vorhandenen `.rest`-Dateien sind der beste Einstieg, um das erwartete Verhalten des Backends zu verstehen.

### `Project/Backend/examplerequests.rest`

Diese Datei deckt die Grundablaeufe ab:

- Benutzer registrieren
- Benutzer einloggen
- Access Token erneuern
- Portfolios auflisten
- Portfolio erstellen
- einzelnes Portfolio lesen
- Portfolio aktualisieren
- Portfolio loeschen
- Benutzer ausloggen

So funktioniert die Datei:

- Oben werden Variablen wie `@baseUrl`, `@email` und `@password` gesetzt.
- Spaetere Requests verwenden diese Werte mit `{{...}}`.
- Nach dem Login muessen `accessToken` und `refreshToken` aus der Response uebernommen werden.
- Nach dem Erstellen eines Portfolios muss die `portfolioId` uebernommen werden.
- Die Requests sind dafuer gedacht, in sinnvoller Reihenfolge nacheinander ausgefuehrt zu werden.

Warum die Datei fuer Tests wichtig ist:

- Sie zeigt den kompletten Auth-Basisfluss.
- Sie zeigt, welche Routen Authentifizierung brauchen.
- Sie zeigt, welche Endpunkte andere Endpunkte vorbereiten.
- Sie beschreibt den wichtigsten Happy Path fuer das Backend.

### `Project/Backend/examplerequests.modules.rest`

Diese Datei deckt die Modulrouten innerhalb eines bestehenden Portfolios ab:

- vollstaendiges Portfolio abrufen mit `GET /portfolio/:id/full`
- Project CRUD
- Skill CRUD
- Social Link CRUD
- Experience CRUD
- Education CRUD
- Bild-Upload fuer Projekte

So funktioniert die Datei:

- Sie setzt voraus, dass bereits ein gueltiger `accessToken` existiert.
- Sie setzt voraus, dass bereits eine echte `portfolioId` existiert.
- IDs fuer neu angelegte Projekte, Skills, Links, Experiences und Educations muessen aus Responses uebernommen werden.
- Beim Upload wird das Feld `image` mit `multipart/form-data` verwendet.

Warum die Datei fuer Tests wichtig ist:

- Sie zeigt die API-Struktur aller Module.
- Sie zeigt, welche Endpunkte dieselben Besitzrechte pruefen.
- Sie zeigt den Upload-Sonderfall.
- Sie zeigt, welche Updates als Teil-Update funktionieren.

## Empfohlene manuelle Testreihenfolge unter Unix

Bevor automatisierte Tests geschrieben werden, sollte das Backend einmal manuell durchgetestet werden.

1. Container starten.
2. Benutzer registrieren.
3. Benutzer einloggen und Token uebernehmen.
4. Ein Portfolio erstellen.
5. Das Portfolio lesen und aktualisieren.
6. Pro Modul mindestens einen Eintrag erstellen.
7. `GET /portfolio/:id/full` testen.
8. Einen gueltigen Bild-Upload testen.
9. Logout testen.
10. Token-Refresh testen.
11. Einige Fehlerfaelle manuell pruefen, zum Beispiel ungueltige IDs oder fehlende Authentifizierung.

Beispiel mit `curl`:

```bash
BASE_URL=http://localhost:3000
EMAIL=tester@example.com
PASSWORD=password123

curl -i -X POST "$BASE_URL/users/register" \
  -H 'Content-Type: application/json' \
  -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}'

curl -i -X POST "$BASE_URL/users/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}'
```

Beispiel fuer Upload:

```bash
curl -i -X POST "$BASE_URL/portfolio/1/projects/1/image" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F image=@./projektbild.png
```

## Was auf jeden Fall getestet werden sollte

### 1. Authentifizierung

Hier lohnt sich Testabdeckung besonders, weil viele andere Routen davon abhaengen.

Testen:

- erfolgreicher Register-Flow
- Register mit bereits vorhandener E-Mail
- erfolgreicher Login
- Login mit falscher E-Mail oder falschem Passwort
- Refresh mit gueltigem Token
- Refresh mit ungueltigem oder widerrufenem Token
- Logout mit gueltigem Token
- geschuetzte Route ohne Token gibt `401`
- geschuetzte Route mit ungueltigem Token gibt `403`

Betroffene Bereiche:

- `authenticateToken.js`
- `authService.js`
- Auth-Routen aus `authRoutes.js`

### 2. Portfolio-Hauptlogik

Portfolio ist der zentrale Einstiegspunkt fuer fast alle Module. Wenn hier etwas kaputt ist, brechen viele weitere Funktionen mit.

Testen:

- Portfolio erstellen mit gueltigen Daten
- Portfolio erstellen mit ungueltigem Slug oder doppeltem Slug
- eigene Portfolios abrufen
- einzelnes eigenes Portfolio abrufen
- fremdes Portfolio darf nicht gelesen werden
- Portfolio aktualisieren
- Portfolio loeschen
- `GET /portfolio/:id/full` liefert Gesamtdaten zurueck

Betroffene Bereiche:

- `portfolioService.js`
- `portfolioAccess.js`
- Portfolio-Routen aus `portfolioRoutes.js`

### 3. Ein Modul als Referenz vollstaendig testen

Es ist nicht noetig, jedes Modul gleich tief zu testen, weil die Module strukturell sehr aehnlich aufgebaut sind.

Empfehlung: **Project** vollstaendig testen, weil dort zusaetzlich der Upload-Fall vorkommt.

Testen:

- Projekte eines eigenen Portfolios abrufen
- Projekt erstellen mit gueltigen Daten
- Projekt erstellen mit ungueltigen URLs oder ungueltigem Datumsbereich
- Projekt aktualisieren
- fremdes oder nicht vorhandenes Projekt gibt `404`
- Projekt loeschen
- Bild-Upload mit gueltiger Bilddatei
- Bild-Upload ohne Datei gibt `400`
- Bild-Upload mit falschem Dateityp gibt `400`

Betroffene Bereiche:

- `projectService.js`
- `uploadProjectImage.js`
- Fehlerbehandlung fuer Multer im `errorHandler.js`

### 4. Ein zweites Modul nur leicht absichern

Da Skills, Social Links, Experiences und Educations aehnlich aufgebaut sind, reicht es normalerweise, zusaetzlich nur noch **ein weiteres Modul** knapp zu testen.

Empfehlung: entweder **Skills** oder **Social Links**.

Zum Beispiel bei Skills testen:

- Skill an Portfolio anhaengen
- doppelter Skill im selben Portfolio gibt `409`
- Skill-Level aktualisieren
- Skill-Zuordnung loeschen

Oder bei Social Links testen:

- Social Link erstellen
- ungueltige URL wird abgelehnt
- Social Link aktualisieren
- Social Link loeschen

Damit ist bereits gut abgesichert, dass die generelle Modulstruktur funktioniert.

### 5. Allgemeine Fehlerbehandlung

Ein kleiner Satz an Fehler-Tests reicht hier aus.

Testen:

- unbekannte Route gibt `404`
- ungueltiges JSON gibt `400`
- Upload mit zu grosser Datei gibt `400`
- unerwartete Fehler werden als `500` behandelt

Betroffene Bereiche:

- `notFoundHandler.js`
- `errorHandler.js`

## Was nicht priorisiert werden muss

Diese Dinge muessen nicht unbedingt einzeln getestet werden, solange die aeusseren Tests gruen sind:

- jede kleine Parser-Funktion separat
- jede Validator-Funktion separat
- jeder Controller bis ins letzte Detail
- alle vier Modularten mit identischer Testtiefe
- jede interne Hilfsfunktion einzeln

Der Grund ist einfach: Wenn die aeusseren Service- und Route-Tests fehlschlagen, sieht man den Fehler meistens trotzdem sofort.

## Empfohlene minimale Reihenfolge fuer automatisierte Tests

1. Auth-Service und Auth-Middleware
2. Portfolio-Service inklusive Besitzpruefung
3. Project-Service inklusive Upload-Fall
4. ein weiteres Modul mit kleiner Testtiefe
5. wenige HTTP-/Route-Tests fuer Statuscodes

## Hinweise fuer die Person, die die Tests schreibt

- Zuerst die wichtigen Happy Paths testen.
- Danach nur die wichtigsten Fehlerfaelle ergaenzen.
- Modelle in Service-Tests moeglichst mocken.
- Die `.rest`-Dateien als Referenz fuer erwartetes Verhalten verwenden.
- Wenn ein Fehler im Backend-Code liegt: an **gian**.
- Wenn ein Fehler in SQL oder Datenbanklogik liegt: an **egor**.