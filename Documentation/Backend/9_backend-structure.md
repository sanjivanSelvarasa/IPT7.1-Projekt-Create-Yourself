# Backend Strukturierung
In der Strukturierung wird festgelegt, welche Aufgaben einzelne Scripte erledigen und wie die Abläufe in dem Backend funktionieren.

## Grundstruktur

```
backend/
  |- 0_routes/
  |- 1_middleware/
  |- 2_controllers/
  |- 3_services/
  |- 4_models/
  |- 5_utils/
  |- uploads/
  |- app.js
```

## Backend Flow

```
Route -> Middleware -> Controller -> Service -> Model -> Datenbank
```

Für Uploads zusätzlich:

```
Route -> Upload Middleware (multer) -> Controller -> Service -> Model -> Datenbank
                                  -> Dateisystem (uploads/)
```

## Erklärung Backend Teilbereiche
In der Erklärung wird dargelegt was welcher Bereich macht und welche Aufgaben er im Backend erfüllt zudem werden Beispiele gezeigt um die veranschaulichung zu fördern

### controllers/
Controller sind für die Verarbeitung von HTTP-Anfragen zuständig.

**Aufgaben**:
- Empfangen Requests (req)
- Lesen von Daten (z. B. req.body, req.params)
- Aufrufen von Service-Funktionen
- Senden der Response (res)

**Beispiel**:
```JS
async function createPortfolio(req, res) {
  const result = await portfolioService.create(req.body);
  res.json(result);
}
```

**Wichtig**:
Controller enthalten keine komplexe Geschäftslogik, sondern steuern nur den Ablauf zwischen Client und Backend-Logik.

Im aktuellen Stand ruft `portfolioController` mehrere spezialisierte Services auf (Project, Skill, SocialLink, Experience, Education).

---

### services/
Services enthalten die Geschäftslogik der Anwendung.

**Aufgaben**:
- Verarbeiten von Daten
- Umsetzung der eigentlichen Funktionalität
- Kommunikation mit der Datenbank (über Models)

**Beispiel**:
```JS
async function createPortfolio(data) {
  validate(data);
  return await db.portfolio.create(data);
}
```

**Wichtig**:
Die Logik ist unabhängig vom HTTP-System und kann wiederverwendet und getestet werden.

Aktuelle modulare Services:
- `portfolioService`
- `projectService`
- `skillService`
- `socialLinkService`
- `experienceService`
- `educationService`
- gemeinsamer Helper: `services/helpers/portfolioAccess.js`

---

### routes/
Routes definieren die API-Endpunkte des Backends.

**Aufgaben**:
- Festlegen von URLs (z. B. /api/portfolio)
- Zuordnung von HTTP-Methoden (GET, POST, PUT, DELETE)
- Weiterleitung an Controller
- Einbindung von Middleware

**Beispiel**:
```JS
router.post("/portfolio", createPortfolio);
```

**Wichtig**: Alle Endpunkte sind zentral organisiert und übersichtlich.

Im aktuellen Projekt liegen Auth- und Portfolio-Routen getrennt in:
- `0_routes/authRoutes.js`
- `0_routes/portfolioRoutes.js`

---

### models/
Models definieren die Struktur der Daten in der Datenbank.

**Aufgaben**:
- Festlegen von Feldern (z. B. name, email)
- Datentypen definieren
- Beziehungen zwischen Daten abbilden

**Beispiel**:
```JS
const Portfolio = {
  title: String,
  userId: Number,
  content: Object
};
```

**Wichtig**: Sorgt für konsistente und strukturierte Daten.

Aktuelle modulare Models:
- `authModel`
- `portfolioModel`
- `projectModel`
- `skillModel`
- `socialLinkModel`
- `experienceModel`
- `educationModel`

---

### middleware/
Middleware wird vor oder zwischen Controller-Aufrufen ausgeführt.

**Aufgaben**:
- Validierung von Requests
- Authentifizierung (z. B. Token prüfen)
- Zugriffskontrolle
- Fehlerbehandlung

**Beispiel**:
```JS
function authMiddleware(req, res, next) {
  // Token prüfen
  next();
}
```

**Wichtig**:
Wiederverwendbare Logik, die nicht im Controller stehen muss.

Im aktuellen Stand existieren u. a.:
- `authenticateToken`
- `errorHandler`
- `notFoundHandler`
- `uploadProjectImage`

---

### utils/
Utils enthalten allgemeine Hilfsfunktionen.

**Aufgaben**:
- Kleine, wiederverwendbare Funktionen
- Unterstützung anderer Teile des Systems

**Beispiel**:
```JS
function generateSlug(title) {
  return title.toLowerCase().replace(" ", "-");
}
```

**Wichtig**:
Utils enthalten keine Geschäftslogik, sondern nur allgemeine Funktionen.

Im aktuellen Stand:
- `ApiError`
- `asyncHandler`
- `authParsers`
- `validators`

---

### app.js
app.js ist der Einstiegspunkt des Backends.

**Aufgaben**:
- Initialisierung des Servers
- Einbindung von Middleware
- Registrierung der Routes
- Starten der Anwendung

**Beispiel**:
```JS
const express = require("express");
const app = express();

const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server läuft");
});
```

**Wichtig**: Verknüpft alle Teile des Backends zu einer funktionierenden Anwendung.

Zusätzlich im aktuellen Stand:
- Statische Auslieferung von Upload-Dateien über `/uploads`
- Start erst nach erfolgreicher DB-Verbindung

---






