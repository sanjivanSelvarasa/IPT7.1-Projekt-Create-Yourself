# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Register page – full browser rendering >> shows an error message when the server rejects the registration
- Location: e2e/auth.spec.ts:327:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('p.text-red-500')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('p.text-red-500')

```

```yaml
- main:
  - link "CreateYourself":
    - /url: /
  - button "Anmelden"
  - button "Registrieren"
  - heading "Wilkommen zurück" [level=1]
  - paragraph: Melde dich an, um dein Portfolio zu bearbeiten.
  - text: E-Mail-Adresse
  - textbox "name@example.com"
  - text: Passwort
  - textbox "•••••••••"
  - button
  - button "Passwort vergessen?"
  - button "Anmelden" [disabled]
  - text: oder Noch kein Konto?
  - button "Jetzt registrieren"
- img
- img
```

# Test source

```ts
  243 |     await page.locator('input[type="email"]').fill('notanemail')
  244 |     // Fill password fields via autocomplete attribute
  245 |     const pwFields = page.locator('input[type="password"]')
  246 |     await pwFields.nth(0).fill('password123')
  247 |     await pwFields.nth(1).fill('password123')
  248 | 
  249 |     let registerCalled = false
  250 |     await page.route('**/users/register', (route) => {
  251 |       registerCalled = true
  252 |       route.continue()
  253 |     })
  254 | 
  255 |     await page.locator('button[type="submit"]').click()
  256 |     await page.waitForTimeout(300)
  257 | 
  258 |     expect(registerCalled).toBe(false)
  259 |   })
  260 | 
  261 |   // -------------------------------------------------------------------------
  262 |   // Client-side JS validation (password rules)
  263 |   // -------------------------------------------------------------------------
  264 | 
  265 |   test('shows an error when passwords do not match', async ({ page }) => {
  266 |     await page.locator('input[type="email"]').fill('user@example.com')
  267 |     const pwFields = page.locator('input[type="password"]')
  268 |     await pwFields.nth(0).fill('password123')
  269 |     await pwFields.nth(1).fill('different456')
  270 | 
  271 |     await page.locator('button[type="submit"]').click()
  272 | 
  273 |     await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
  274 |     await expect(page.locator('p.text-red-500')).toContainText('stimmen nicht überein')
  275 |   })
  276 | 
  277 |   test('shows an error when the password is shorter than 8 characters', async ({ page }) => {
  278 |     await page.locator('input[type="email"]').fill('user@example.com')
  279 |     const pwFields = page.locator('input[type="password"]')
  280 |     await pwFields.nth(0).fill('short')
  281 |     await pwFields.nth(1).fill('short')
  282 | 
  283 |     await page.locator('button[type="submit"]').click()
  284 | 
  285 |     await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
  286 |     await expect(page.locator('p.text-red-500')).toContainText('mindestens 8 Zeichen')
  287 |   })
  288 | 
  289 |   test('does not call the API when client-side validation fails', async ({ page }) => {
  290 |     let registerCalled = false
  291 |     await page.route('**/users/register', (route) => {
  292 |       registerCalled = true
  293 |       route.continue()
  294 |     })
  295 | 
  296 |     await page.locator('input[type="email"]').fill('user@example.com')
  297 |     const pwFields = page.locator('input[type="password"]')
  298 |     await pwFields.nth(0).fill('abc')
  299 |     await pwFields.nth(1).fill('xyz')
  300 | 
  301 |     await page.locator('button[type="submit"]').click()
  302 |     await page.waitForTimeout(300)
  303 | 
  304 |     expect(registerCalled).toBe(false)
  305 |   })
  306 | 
  307 |   // -------------------------------------------------------------------------
  308 |   // Successful registration
  309 |   // -------------------------------------------------------------------------
  310 | 
  311 |   test('redirects to /login after successful registration', async ({ page }) => {
  312 |     await page.locator('input[type="email"]').fill('newuser@example.com')
  313 |     const pwFields = page.locator('input[type="password"]')
  314 |     await pwFields.nth(0).fill('securepassword')
  315 |     await pwFields.nth(1).fill('securepassword')
  316 | 
  317 |     await page.locator('button[type="submit"]').click()
  318 | 
  319 |     await page.waitForURL('**/login', { timeout: 5000 })
  320 |     expect(page.url()).toContain('/login')
  321 |   })
  322 | 
  323 |   // -------------------------------------------------------------------------
  324 |   // Failed registration (server error)
  325 |   // -------------------------------------------------------------------------
  326 | 
  327 |   test('shows an error message when the server rejects the registration', async ({ page }) => {
  328 |     await page.route('**/users/register', (route) =>
  329 |       route.fulfill({
  330 |         status: 409,
  331 |         contentType: 'application/json',
  332 |         body: JSON.stringify({ message: 'Email already in use' }),
  333 |       }),
  334 |     )
  335 | 
  336 |     await page.locator('input[type="email"]').fill('existing@example.com')
  337 |     const pwFields = page.locator('input[type="password"]')
  338 |     await pwFields.nth(0).fill('password123')
  339 |     await pwFields.nth(1).fill('password123')
  340 | 
  341 |     await page.locator('button[type="submit"]').click()
  342 | 
> 343 |     await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 3000 })
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  344 |   })
  345 | })
  346 | 
```