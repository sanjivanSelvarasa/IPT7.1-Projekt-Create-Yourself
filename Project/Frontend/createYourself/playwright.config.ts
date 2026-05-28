import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright end-to-end test configuration.
 *
 * - Automatically starts the Vite dev server before running tests.
 * - Tests run against Chromium and Firefox (WebKit requires icu74 from the
 *   Arch AUR; see e2e/README.md for details).
 * - API calls to http://localhost:3000 are intercepted per test via
 *   page.route() so the Docker backend does not need to be running.
 */
export default defineConfig({
  testDir: './e2e',

  /* Fail fast: no retries on CI, 1 locally to account for flakiness */
  retries: process.env.CI ? 2 : 0,

  /* Run test files in parallel */
  fullyParallel: true,

  /* Reporter: compact in CI, interactive list locally */
  reporter: process.env.CI ? 'dot' : 'list',

  use: {
    /* Base URL for page.goto('/login') style navigation */
    baseURL: 'http://localhost:5173',

    /* Collect traces on failure for debugging */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    /* WebKit (Safari engine) requires the system package 'icu74'.
       On Arch Linux install from AUR: yay -S icu74
       Uncomment the block below once the package is available.
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  /* Start the Vite dev server automatically before running any test */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
