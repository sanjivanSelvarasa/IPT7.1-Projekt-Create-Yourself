import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { defineComponent } from 'vue'
import Login from '@/pages/auth/Login.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}))

vi.mock('@/api/auth.api.ts', () => ({
  loginApi: vi.fn(),
  logoutApi: vi.fn(),
  registerApi: vi.fn(),
  tokenApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as authApi from '@/api/auth.api.ts'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()
vi.stubGlobal('localStorage', localStorageMock)

const Stub = defineComponent({ template: '<div />' })

function buildWrapper() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/login', component: Stub },
      { path: '/register', component: Stub },
      { path: '/dashboard', component: Stub },
    ],
  })

  return mount(Login, {
    global: {
      plugins: [createPinia(), router],
      stubs: { Logo: true, RouterLink: true },
    },
  })
}

describe('Login page', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('email input attributes (HTML5 constraint validation)', () => {
    it('email input has type="email" so the browser rejects invalid formats', () => {
      const wrapper = buildWrapper()
      const emailInput = wrapper.find('input[type="email"]')
      expect(emailInput.exists()).toBe(true)
    })

    it('email input is marked as required', () => {
      const wrapper = buildWrapper()
      const emailInput = wrapper.find('input[type="email"]')
      expect(emailInput.attributes('required')).toBeDefined()
    })

    it('submit button is disabled when email or password are empty', () => {
      const wrapper = buildWrapper()
      // Button is disabled via :disabled="isLoading || !email || !password"
      const submitBtn = wrapper.find('button[type="submit"]')
      expect(submitBtn.attributes('disabled')).toBeDefined()
    })

    it('submit button is disabled when only the password is filled (email still empty)', async () => {
      const wrapper = buildWrapper()
      // Fill password but leave email blank
      await wrapper.findAll('input')[1].setValue('password123')
      const submitBtn = wrapper.find('button[type="submit"]')
      // !email is still true → button must stay disabled
      expect(submitBtn.attributes('disabled')).toBeDefined()
    })

    it('submit button becomes enabled only when both email and password are filled', async () => {
      const wrapper = buildWrapper()
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')
      await inputs[1].setValue('password123')
      const submitBtn = wrapper.find('button[type="submit"]')
      expect(submitBtn.attributes('disabled')).toBeUndefined()
    })
  })

  describe('successful login (documented: Benutzer authentifizieren)', () => {
    it('redirects to /dashboard after successful login', async () => {
      vi.mocked(authApi.loginApi).mockResolvedValue({ accessToken: 'token-abc' } as any)

      const wrapper = buildWrapper()
      const router = wrapper.vm.$router

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')
      await inputs[1].setValue('password123')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      await new Promise(r => setTimeout(r, 0))

      expect(router.currentRoute.value.path).toBe('/dashboard')
    })

    it('stores the access token in localStorage after login', async () => {
      vi.mocked(authApi.loginApi).mockResolvedValue({ accessToken: 'token-abc' } as any)

      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')
      await inputs[1].setValue('password123')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      await new Promise(r => setTimeout(r, 0))

      expect(localStorage.getItem('token')).toBe('token-abc')
    })
  })

  describe('failed login (documented: Validierung & Fehlermeldungen)', () => {
    it('displays an error message when credentials are wrong', async () => {
      vi.mocked(authApi.loginApi).mockRejectedValue({ text: 'Invalid credentials' })

      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('bad@example.com')
      await inputs[1].setValue('wrongpassword')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      await new Promise(r => setTimeout(r, 0))

      expect(wrapper.find('p.text-red-500').exists()).toBe(true)
    })

    it('does not redirect when login fails', async () => {
      vi.mocked(authApi.loginApi).mockRejectedValue({ text: 'Invalid credentials' })

      const wrapper = buildWrapper()
      const router = wrapper.vm.$router

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('bad@example.com')
      await inputs[1].setValue('wrongpassword')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      await new Promise(r => setTimeout(r, 0))

      expect(router.currentRoute.value.path).not.toBe('/dashboard')
    })
  })

  describe('password visibility toggle', () => {
    it('toggles the password input type when the eye button is clicked', async () => {
      const wrapper = buildWrapper()
      const passwordInput = wrapper.findAll('input')[1]

      expect(passwordInput.attributes('type')).toBe('password')

      // click the toggle button (the eye icon button inside the password field)
      const toggleBtn = wrapper.findAll('button[type="button"]').find(b =>
        b.find('i').exists() && (b.find('i').classes().some(c => c.includes('eye')))
      )
      expect(toggleBtn).toBeTruthy()
      await toggleBtn!.trigger('click')

      expect(passwordInput.attributes('type')).toBe('text')
    })
  })
})
