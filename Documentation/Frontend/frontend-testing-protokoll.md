## Protokoll: Welche Tests im Frontend gemacht werden müssen

### 1. Ziel der Tests

Ziel der Frontend-Tests ist es zu prüfen, ob die Benutzeroberfläche korrekt funktioniert, verständlich ist und sauber mit dem Backend kommuniziert. Fehler sollen früh erkannt werden, bevor die Anwendung verwendet oder veröffentlicht wird.

---

## 2. Funktionale Tests

### Navigation testen

Es muss geprüft werden, ob alle Seiten korrekt erreichbar sind.

**Zu testen:**

* Klick auf Navigationselemente
* Wechsel zwischen Seiten
* Zurück-Button im Browser
* Direkte URL-Eingabe
* Weiterleitung nach Login oder Logout

**Beispiel:**

Wenn der Benutzer auf „Dashboard“ klickt, soll die Dashboard-Seite geladen werden.

---

## 3. Formular-Tests

Alle Formulare müssen getestet werden.

**Zu testen:**

* Pflichtfelder
* Falsche Eingaben
* Leere Eingaben
* Maximale Zeichenlänge
* Erfolgreiches Absenden
* Fehlermeldungen
* Zurücksetzen oder Aktualisieren nach dem Speichern

**Beispiel:**

Wenn ein Benutzer ein leeres Pflichtfeld absendet, soll eine verständliche Fehlermeldung angezeigt werden.

---

## 4. API- und Daten-Tests

Es muss geprüft werden, ob das Frontend korrekt mit dem Backend kommuniziert.

**Zu testen:**

* Daten werden korrekt geladen
* Daten werden korrekt angezeigt
* Neue Daten werden gespeichert
* Geänderte Daten werden aktualisiert
* Gelöschte Daten verschwinden aus der Ansicht
* Ladezustände werden angezeigt
* Fehler vom Backend werden abgefangen

**Beispiel:**

Wenn eine neue Section erstellt wird, soll sie danach sofort in der Liste angezeigt werden.

---

## 5. Authentifizierungs-Tests

Falls Login verwendet wird, muss die Authentifizierung getestet werden.

**Zu testen:**

* Login mit korrekten Daten
* Login mit falschen Daten
* Logout
* Zugriff auf geschützte Seiten ohne Token
* Token im Header
* Verhalten bei abgelaufenem Token

**Beispiel:**

Ein nicht eingeloggter Benutzer darf nicht auf den Editor zugreifen.

---

## 6. Fehler- und Edge-Case-Tests

Es müssen auch ungewöhnliche Fälle getestet werden.

**Zu testen:**

* Keine Daten vorhanden
* Sehr lange Texte
* Ungültige IDs
* API nicht erreichbar
* Langsame Internetverbindung
* Benutzer klickt mehrfach schnell hintereinander
* Seite wird während Änderungen verlassen

**Beispiel:**

Wenn keine Sections vorhanden sind, soll eine leere Ansicht oder ein Hinweis angezeigt werden.

---

## 7. Browser-Tests

Die Anwendung muss in mehreren Browsern getestet werden.

**Zu testen:**

* Chrome
* Firefox
* Edge
* Mobile Browser

**Beispiel:**

Das Layout soll in Chrome und Firefox gleich korrekt funktionieren.