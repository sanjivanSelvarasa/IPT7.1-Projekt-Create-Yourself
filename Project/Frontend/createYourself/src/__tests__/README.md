# Frontend Test Suite

## What Is Covered

This frontend now has two layers of tests:

- **Unit and component tests with Vitest** for utilities, stores, router guards, reusable UI components, and page-level validation logic.
- **Browser e2e tests with Playwright** for fully rendered UI flows in real browsers.

The current unit suite covers:

- utility logic such as slug generation and date formatting
- Pinia stores for auth, portfolio, profile, skills, education, experience, social links, sections, and editor blocks
- reusable UI components such as `InputApp` and `SectionTitle`
- router guard behavior for protected and public routes
- login and register page validation behavior
- dashboard portfolio filter behavior

The current Playwright suite covers:

- full rendering of the login and register pages
- native browser email validation for invalid email formats
- password visibility toggle behavior
- successful and failed login flows
- successful registration flow
- client-side registration validation such as password mismatch and minimum length
- router guard redirects for protected routes
- basic navigation between login and register pages
- cross-browser execution in Chromium and Firefox

The browser tests mock backend API calls at the network layer, so they do **not** require the backend or Docker stack to be running.

## Quick Start

Always run test commands from this folder:

```bash
cd Project/Frontend/createYourself
```

### Unit Tests

```bash
# run all unit tests once
npm run test:unit -- --run

# run unit tests in watch mode
npm run test:unit
```

### Browser Tests

```bash
# run all Playwright tests
npm run test:e2e
```

Playwright starts the Vite dev server automatically through `playwright.config.ts`.

## What Needs To Be Installed

### Required Node Packages

After cloning the project, install dependencies normally:

```bash
npm install
```

### Required Playwright Browsers

The e2e tests need Playwright browser binaries:

```bash
npx playwright install chromium firefox
```

That is enough for the currently configured projects.

### Linux / Arch Notes

On this machine, Chromium and Firefox work with Playwright.

WebKit is optional and is **not** enabled by default in the config. If you want Safari-engine coverage on Arch Linux, you may need extra system packages, including:

```bash
sudo pacman -S flite webkitgtk-6.0
```

Depending on your Arch setup, WebKit may still require an older ICU package such as `icu74` from the AUR. Because of that dependency mismatch, the current Playwright config only runs Chromium and Firefox.

## How The Tests Work

### Unit Test Stack

- **Vitest**: test runner and assertions
- **@vue/test-utils**: mounting Vue components
- **jsdom**: browser-like environment for DOM-based unit tests

### Browser Test Stack

- **Playwright**: full browser automation for Chromium and Firefox
- **Vite webServer integration**: starts the frontend automatically before e2e tests run
- **`page.route()` API mocking**: intercepts calls to `http://localhost:3000` so browser tests stay isolated from the backend

## Key Test Patterns

### Store Tests

External API modules are replaced with `vi.mock(...)`, so no real HTTP requests are made.

```ts
vi.mock('@/api/auth.api.ts', () => ({
  loginApi: vi.fn(),
  registerApi: vi.fn(),
}))
```

### Page Tests

Page unit tests mount the page with:

- a real in-memory router
- a real Pinia instance
- mocked translations through `vue-i18n`

This keeps tests focused on frontend behavior instead of backend responses or translation files.

### localStorage Handling

Some Vitest workers do not provide a stable `localStorage`, so tests that rely on auth state use `vi.stubGlobal('localStorage', ...)` with a full mock implementation.

### Browser Validation

The Playwright tests exist specifically to cover things jsdom cannot prove reliably, especially native HTML5 form validation in a real browser.

## Useful Commands

```bash
# run one unit test file
npm run test:unit -- --run src/__tests__/stores/authStore.spec.ts

# run unit tests that match a name
npm run test:unit -- --run -t "login"

# run unit tests with verbose output
npm run test:unit -- --run --reporter=verbose

# run one Playwright spec file
npx playwright test e2e/auth.spec.ts

# run only Chromium browser tests
npx playwright test --project=chromium

# run only Firefox browser tests
npx playwright test --project=firefox
```

## Important Note

If a Playwright test fails, that means the current frontend behavior does not match the expected behavior encoded by the test. The tests are intended to reveal those mismatches, not hide them.