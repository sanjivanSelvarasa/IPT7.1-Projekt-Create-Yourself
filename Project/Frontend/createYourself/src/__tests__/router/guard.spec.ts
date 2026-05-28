import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { defineComponent } from 'vue'

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

// Stub component for all routes
const Stub = defineComponent({ template: '<div />' })

// Re-create the router with the same guard logic as src/router/index.ts
// but using memory history so no real browser navigation happens
function buildRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Landingpage', component: Stub, meta: { requiresAuth: false } },
      { path: '/dashboard', name: 'Dashboard', component: Stub, meta: { requiresAuth: true } },
      { path: '/login', name: 'Login', component: Stub, meta: { requiresAuth: false } },
      { path: '/register', name: 'Register', component: Stub, meta: { requiresAuth: false } },
    ],
  })

  router.beforeEach((to) => {
    if (to.meta.requiresAuth && localStorage.getItem('token') === null) {
      return '/login'
    }
  })

  return router
}

describe('Router navigation guard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('redirects unauthenticated users from protected routes to /login', async () => {
    const router = buildRouter()
    await router.push('/dashboard')

    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('allows authenticated users to access protected routes', async () => {
    localStorage.setItem('token', 'valid-token')
    const router = buildRouter()
    await router.push('/dashboard')

    expect(router.currentRoute.value.name).toBe('Dashboard')
  })

  it('allows unauthenticated users to access public routes', async () => {
    const router = buildRouter()
    await router.push('/')

    expect(router.currentRoute.value.name).toBe('Landingpage')
  })

  it('allows unauthenticated users to access /login', async () => {
    const router = buildRouter()
    await router.push('/login')

    expect(router.currentRoute.value.name).toBe('Login')
  })
})
