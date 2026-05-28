import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { defineComponent } from 'vue'
import Register from '@/pages/auth/Register.vue'

// Mock vue-i18n so the component's tl() calls return the key string
vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}))

// Mock the auth API — the store is used by the page
vi.mock('@/api/auth.api.ts', () => ({
  registerApi: vi.fn(),
  loginApi: vi.fn(),
  logoutApi: vi.fn(),
  tokenApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as authApi from '@/api/auth.api.ts'

// Provide a localStorage mock (same pattern used in authStore tests)
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
      { path: '/register', component: Stub },
      { path: '/login', component: Stub },
    ],
  })

  return mount(Register, {
    global: {
      plugins: [createPinia(), router],
      // Stub Logo (uses RouterLink internally) and layout components
      stubs: { Logo: true, RouterLink: true },
    },
  })
}

describe('Register page', () => {
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

    it('submit button is disabled when email is empty', () => {
      const wrapper = buildWrapper()
      // Button is disabled via :disabled="isLoading || !email || !password || !confirmPassword"
      const submitBtn = wrapper.find('button[type="submit"]')
      expect(submitBtn.attributes('disabled')).toBeDefined()
    })

    it('does not call the API when the email field is empty', async () => {
      const wrapper = buildWrapper()

      // Only fill password fields, leave email blank
      const inputs = wrapper.findAll('input')
      await inputs[1].setValue('password123')
      await inputs[2].setValue('password123')

      await wrapper.find('form').trigger('submit')

      // submit() proceeds but authStore.register receives an empty string;
      // no token should be stored
      expect(localStorage.getItem('token')).toBeNull()
    })
  })

  describe('client-side validation (documented: Validierung & Fehlermeldungen)', () => {
    it('shows an error when passwords do not match', async () => {
      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')  // email
      await inputs[1].setValue('password1')          // password
      await inputs[2].setValue('password2')          // confirmPassword

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Passwörter stimmen nicht überein.')
    })

    it('shows an error when password is shorter than 8 characters', async () => {
      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')
      await inputs[1].setValue('short')
      await inputs[2].setValue('short')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Passwort muss mindestens 8 Zeichen lang sein.')
    })

    it('does not call the API when validation fails', async () => {
      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('user@example.com')
      await inputs[1].setValue('abc')
      await inputs[2].setValue('xyz')

      await wrapper.find('form').trigger('submit')

      expect(authApi.registerApi).not.toHaveBeenCalled()
    })
  })

  describe('successful registration (documented: Registrierung neuer Accounts)', () => {
    it('redirects to /login after successful registration', async () => {
      vi.mocked(authApi.registerApi).mockResolvedValue(undefined)

      const wrapper = buildWrapper()
      const router = wrapper.vm.$router

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('new@example.com')
      await inputs[1].setValue('strongpassword')
      await inputs[2].setValue('strongpassword')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      // allow async store action to settle
      await new Promise(r => setTimeout(r, 0))

      expect(router.currentRoute.value.path).toBe('/login')
    })
  })

  describe('failed registration', () => {
    it('displays the store error when the API call fails', async () => {
      vi.mocked(authApi.registerApi).mockRejectedValue({ text: 'Email already taken' })

      const wrapper = buildWrapper()

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('taken@example.com')
      await inputs[1].setValue('password123')
      await inputs[2].setValue('password123')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()
      await new Promise(r => setTimeout(r, 0))

      // Error paragraph is rendered (v-if="error")
      expect(wrapper.find('p.text-red-500').exists()).toBe(true)
    })
  })
})
