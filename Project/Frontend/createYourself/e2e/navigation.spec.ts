import { test, expect } from '@playwright/test'

// ---------------------------------------------------------------------------
// Router navigation guard tests
//
// The Vue Router's beforeEach guard redirects unauthenticated users to /login
// when they try to access any route with meta.requiresAuth === true.
// These tests prove that guard works in a real browser environment.
// ---------------------------------------------------------------------------

test.describe('Router navigation guard', () => {
  test.beforeEach(async ({ page }) => {
    // Make sure localStorage is clean before every test
    await page.addInitScript(() => localStorage.clear())

    // Mock the token-refresh endpoint so the app doesn't loop on 401
    await page.route('**/token', (route) =>
      route.fulfill({ status: 401, body: '' }),
    )
  })

  // -------------------------------------------------------------------------
  // Unauthenticated access → should redirect to /login
  // -------------------------------------------------------------------------

  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/create',
    '/publish',
    '/theme',
  ] as const

  for (const route of protectedRoutes) {
    test(`unauthenticated user is redirected from ${route} to /login`, async ({ page }) => {
      await page.goto(route)
      await page.waitForURL('**/login', { timeout: 5000 })
      expect(page.url()).toContain('/login')
    })
  }

  // -------------------------------------------------------------------------
  // Authenticated access → should NOT redirect
  // -------------------------------------------------------------------------

  test('authenticated user can access /dashboard directly', async ({ page }) => {
    // Set a token before the page loads
    await page.addInitScript(() => localStorage.setItem('token', 'mock-token'))

    // Mock all API calls that Dashboard may fire on mount
    await page.route('**/*', (route) => {
      const url = route.request().url()
      if (url.includes('/users/') || url.includes('/portfolios') || url.includes('/token')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        })
      }
      return route.continue()
    })

    await page.goto('/dashboard')

    // Should NOT be redirected back to /login
    await page.waitForTimeout(1000)
    expect(page.url()).not.toContain('/login')
  })

  // -------------------------------------------------------------------------
  // Public routes → always accessible without a token
  // -------------------------------------------------------------------------

  test('landing page (/) is accessible without authentication', async ({ page }) => {
    await page.goto('/')
    // Should stay on the landing page, not redirect to /login
    await page.waitForTimeout(500)
    expect(page.url()).not.toContain('/login')
  })

  test('/login is accessible without authentication', async ({ page }) => {
    await page.goto('/login')
    await page.waitForTimeout(500)
    expect(page.url()).toContain('/login')
  })

  test('/register is accessible without authentication', async ({ page }) => {
    await page.goto('/register')
    await page.waitForTimeout(500)
    expect(page.url()).toContain('/register')
  })
})

// ---------------------------------------------------------------------------
// Cross-page navigation flow
// ---------------------------------------------------------------------------

test.describe('Navigation flow', () => {
  test('clicking the Register button on the Login page navigates to /register', async ({ page }) => {
    await page.goto('/login')

    // The component has a button that calls router.push('/register')
    // It's the tab/toggle at the top with the register label
    await page.locator('button[type="button"]').filter({ hasText: /register|Registrier/i }).first().click()

    await page.waitForURL('**/register', { timeout: 3000 })
    expect(page.url()).toContain('/register')
  })

  test('clicking the Login button on the Register page navigates to /login', async ({ page }) => {
    await page.goto('/register')

    await page.locator('button[type="button"]').filter({ hasText: /login|anmeld/i }).first().click()

    await page.waitForURL('**/login', { timeout: 3000 })
    expect(page.url()).toContain('/login')
  })
})
