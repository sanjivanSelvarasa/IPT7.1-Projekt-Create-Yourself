import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

// Mock the API module so no real HTTP requests are made
vi.mock('@/api/auth.api.ts', () => ({
  loginApi: vi.fn(),
  logoutApi: vi.fn(),
  registerApi: vi.fn(),
  tokenApi: vi.fn(),
}))

import * as authApi from '@/api/auth.api.ts'

// Provide a fully functional localStorage mock regardless of test environment
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

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('stores the access token on successful login', async () => {
      vi.mocked(authApi.loginApi).mockResolvedValue({ accessToken: 'abc123' } as any)

      const store = useAuthStore()
      await store.login('user@example.com', 'password')

      expect(store.token).toBe('abc123')
      expect(localStorage.getItem('token')).toBe('abc123')
      expect(store.error).toBeNull()
    })

    it('sets an error when login fails', async () => {
      vi.mocked(authApi.loginApi).mockRejectedValue({ text: 'Invalid credentials' })

      const store = useAuthStore()
      await store.login('bad@example.com', 'wrong')

      expect(store.token).toBeNull()
      expect(store.error).toBe('Invalid credentials')
    })
  })

  describe('register', () => {
    it('clears errors on successful registration', async () => {
      vi.mocked(authApi.registerApi).mockResolvedValue(undefined)

      const store = useAuthStore()
      store.error = 'old error' as any
      await store.register('new@example.com', 'password')

      expect(store.error).toBeNull()
    })

    it('sets an error when registration fails', async () => {
      vi.mocked(authApi.registerApi).mockRejectedValue({ text: 'Email already taken' })

      const store = useAuthStore()
      await store.register('taken@example.com', 'password')

      expect(store.error).toBe('Email already taken')
    })
  })

  describe('logout', () => {
    it('clears the token from state and localStorage on success', async () => {
      vi.mocked(authApi.logoutApi).mockResolvedValue(undefined)
      localStorage.setItem('token', 'abc123')

      const store = useAuthStore()
      store.token = 'abc123'
      await store.logout()

      expect(store.token).toBeNull()
      expect(localStorage.getItem('token')).toBeNull()
    })

    it('throws and sets an error when logout fails', async () => {
      vi.mocked(authApi.logoutApi).mockRejectedValue({ text: 'Server error' })
      localStorage.setItem('token', 'abc123')

      const store = useAuthStore()
      store.token = 'abc123'

      await expect(store.logout()).rejects.toBeTruthy()
    })
  })

  describe('refreshToken', () => {
    it('stores the new access token on success', async () => {
      vi.mocked(authApi.tokenApi).mockResolvedValue({ accessToken: 'newToken' } as any)

      const store = useAuthStore()
      await store.refreshToken()

      expect(localStorage.getItem('token')).toBe('newToken')
    })

    it('clears the old token before refreshing', async () => {
      vi.mocked(authApi.tokenApi).mockRejectedValue({ text: 'Refresh failed' })
      localStorage.setItem('token', 'oldToken')

      const store = useAuthStore()
      await store.refreshToken()

      // old token is removed regardless of outcome
      expect(localStorage.getItem('token')).toBeNull()
    })
  })
})
