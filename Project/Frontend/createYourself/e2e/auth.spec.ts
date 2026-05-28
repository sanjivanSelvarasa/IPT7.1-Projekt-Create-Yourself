import { test, expect } from '@playwright/test'

// ---------------------------------------------------------------------------
// Helper: intercept every call to the backend so the Docker stack does not
// need to be running.  Each test can override individual routes as needed.
// ---------------------------------------------------------------------------

/** Register all standard API mocks for a fresh page. */
async function mockApis(page: import('@playwright/test').Page) {
  // Catch-all fallback: any unspecified call to the backend succeeds with an
  // empty result.  Registered first so specific routes below take priority
  // (Playwright resolves handlers in reverse registration order).
  await page.route('http://localhost:3000/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    }),
  )

  // Default: login succeeds – the auth store reads `data.accessToken`
  await page.route('**/users/login', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ accessToken: 'mock-access-token' }),
    }),
  )

  // Default: register succeeds – apiFetch always calls res.json(), so return valid JSON
  await page.route('**/users/register', (route) =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    }),
  )

  // Token-refresh endpoint
  await page.route('**/token', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify('mock-access-token'),
    }),
  )
}

// ===========================================================================
// LOGIN PAGE
// ===========================================================================

test.describe('Login page – full browser rendering', () => {
  test.beforeEach(async ({ page }) => {
    await mockApis(page)
    await page.goto('/login')
  })

  // -------------------------------------------------------------------------
  // UI rendering
  // -------------------------------------------------------------------------

  test('renders the login form', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // HTML5 native browser validation (this is what Playwright proves vs jsdom)
  // -------------------------------------------------------------------------

  test('submit button is disabled when both fields are empty', async ({ page }) => {
    const btn = page.locator('button[type="submit"]')
    await expect(btn).toBeDisabled()
  })

  test('submit button is disabled when only the password is filled', async ({ page }) => {
    await page.locator('input[type="password"]').fill('mysecretpassword')
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })

  test('submit button is disabled when only the email is filled', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })

  test('submit button becomes enabled when both fields are filled', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('mysecretpassword')
    await expect(page.locator('button[type="submit"]')).toBeEnabled()
  })

  /**
   * Real browser test: the browser's built-in email validator rejects
   * "notanemail" and prevents form submission.  In jsdom this does not work
   * because jsdom ignores constraint validation.
   */
  test('browser rejects a plain text value in the email field (native HTML5 validation)', async ({ page }) => {
    // Type an invalid "email" value directly into the input
    await page.locator('input[type="email"]').fill('notanemail')
    await page.locator('input[type="password"]').fill('password123')

    // Track whether a request to /users/login is fired
    let loginCalled = false
    await page.route('**/users/login', (route) => {
      loginCalled = true
      route.continue()
    })

    // Click the submit button — the browser should prevent the request
    await page.locator('button[type="submit"]').click()

    // Give any async request a moment to fire (it should not)
    await page.waitForTimeout(300)

    expect(loginCalled).toBe(false)
  })

  test('browser rejects an email without a domain (native HTML5 validation)', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@')
    await page.locator('input[type="password"]').fill('password123')

    let loginCalled = false
    await page.route('**/users/login', (route) => {
      loginCalled = true
      route.continue()
    })

    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(300)

    expect(loginCalled).toBe(false)
  })

  // -------------------------------------------------------------------------
  // Successful login
  // -------------------------------------------------------------------------

  test('redirects to /dashboard after successful login', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('password123')
    await page.locator('button[type="submit"]').click()

    await page.waitForURL('**/dashboard', { timeout: 5000 })
    expect(page.url()).toContain('/dashboard')
  })

  test('stores the access token in localStorage after login', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('password123')
    await page.locator('button[type="submit"]').click()

    await page.waitForURL('**/dashboard', { timeout: 5000 })

    const token = await page.evaluate(() => localStorage.getItem('token'))
    expect(token).toBe('mock-access-token')
  })

  // -------------------------------------------------------------------------
  // Failed login
  // -------------------------------------------------------------------------

  test('displays an error message when credentials are rejected by the server', async ({ page }) => {
    // Use 500 (not 401) so apiFetch does not trigger an infinite token-refresh
    // loop before surfacing the error to the UI.
    await page.route('**/users/login', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' }),
      }),
    )

    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('wrongpassword')
    await page.locator('button[type="submit"]').click()

    // An error paragraph should appear
    await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
  })

  test('does not navigate away when login fails', async ({ page }) => {
    await page.route('**/users/login', (route) =>
      route.fulfill({ status: 500, body: '' }),
    )

    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('wrongpassword')
    await page.locator('button[type="submit"]').click()

    await page.waitForTimeout(500)
    expect(page.url()).toContain('/login')
  })

  // -------------------------------------------------------------------------
  // Password visibility toggle
  // -------------------------------------------------------------------------

  test('password input toggles between text and password types', async ({ page }) => {
    const pwInput = page.locator('input[autocomplete="current-password"]')

    // Initially password is hidden
    await expect(pwInput).toHaveAttribute('type', 'password')

    // Click the eye icon button – it's the button that contains the fa-eye icon
    await page.locator('button:has(i.fa-regular.fa-eye)').click()
    await expect(pwInput).toHaveAttribute('type', 'text')

    // Click again (now shows fa-eye-slash) to hide
    await page.locator('button:has(i.fa-regular.fa-eye-slash)').click()
    await expect(pwInput).toHaveAttribute('type', 'password')
  })
})

// ===========================================================================
// REGISTER PAGE
// ===========================================================================

test.describe('Register page – full browser rendering', () => {
  test.beforeEach(async ({ page }) => {
    await mockApis(page)
    await page.goto('/register')
  })

  // -------------------------------------------------------------------------
  // UI rendering
  // -------------------------------------------------------------------------

  test('renders the registration form', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible()
    // Two password fields
    const pwFields = page.locator('input[type="password"]')
    await expect(pwFields).toHaveCount(2)
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // Native browser email validation
  // -------------------------------------------------------------------------

  test('browser blocks submission when email is not a valid email address', async ({ page }) => {
    await page.locator('input[type="email"]').fill('notanemail')
    // Fill password fields via autocomplete attribute
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('password123')
    await pwFields.nth(1).fill('password123')

    let registerCalled = false
    await page.route('**/users/register', (route) => {
      registerCalled = true
      route.continue()
    })

    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(300)

    expect(registerCalled).toBe(false)
  })

  // -------------------------------------------------------------------------
  // Client-side JS validation (password rules)
  // -------------------------------------------------------------------------

  test('shows an error when passwords do not match', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('password123')
    await pwFields.nth(1).fill('different456')

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
    await expect(page.locator('p.text-red-500')).toContainText('stimmen nicht überein')
  })

  test('shows an error when the password is shorter than 8 characters', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com')
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('short')
    await pwFields.nth(1).fill('short')

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
    await expect(page.locator('p.text-red-500')).toContainText('mindestens 8 Zeichen')
  })

  test('does not call the API when client-side validation fails', async ({ page }) => {
    let registerCalled = false
    await page.route('**/users/register', (route) => {
      registerCalled = true
      route.continue()
    })

    await page.locator('input[type="email"]').fill('user@example.com')
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('abc')
    await pwFields.nth(1).fill('xyz')

    await page.locator('button[type="submit"]').click()
    await page.waitForTimeout(300)

    expect(registerCalled).toBe(false)
  })

  // -------------------------------------------------------------------------
  // Successful registration
  // -------------------------------------------------------------------------

  test('redirects to /login after successful registration', async ({ page }) => {
    await page.locator('input[type="email"]').fill('newuser@example.com')
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('securepassword')
    await pwFields.nth(1).fill('securepassword')

    await page.locator('button[type="submit"]').click()

    await page.waitForURL('**/login', { timeout: 5000 })
    expect(page.url()).toContain('/login')
  })

  // -------------------------------------------------------------------------
  // Failed registration (server error)
  // -------------------------------------------------------------------------

  test('shows an error message when the server rejects the registration', async ({ page }) => {
    await page.route('**/users/register', (route) =>
      route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Email already in use' }),
      }),
    )

    await page.locator('input[type="email"]').fill('existing@example.com')
    const pwFields = page.locator('input[type="password"]')
    await pwFields.nth(0).fill('password123')
    await pwFields.nth(1).fill('password123')

    await page.locator('button[type="submit"]').click()

    await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
  })
})
