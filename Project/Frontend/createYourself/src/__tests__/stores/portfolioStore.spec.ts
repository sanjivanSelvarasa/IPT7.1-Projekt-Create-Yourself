import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolioStore'

vi.mock('@/api/portfolio.api.ts', () => ({
  getPortoliosApi: vi.fn(),
  getPortfolioByIdApi: vi.fn(),
  getFullPortfolioByIdApi: vi.fn(),
  createPortfolioApi: vi.fn(),
  updatePortfolioByIdApi: vi.fn(),
  deletePortfolioApi: vi.fn(),
  slugAvailableApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({
  apiFetch: vi.fn(),
}))

import * as portfolioApi from '@/api/portfolio.api.ts'

const mockPortfolio = {
  id: 1,
  title: 'My Portfolio',
  slug: 'my-portfolio',
  description: 'A test portfolio',
}

describe('portfolioStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getPortfolio', () => {
    it('populates portfolios on success', async () => {
      vi.mocked(portfolioApi.getPortoliosApi).mockResolvedValue([mockPortfolio] as any)

      const store = usePortfolioStore()
      await store.getPortfolio()

      expect(store.portfolios).toEqual([mockPortfolio])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(portfolioApi.getPortoliosApi).mockRejectedValue({ message: 'Network error' })

      const store = usePortfolioStore()
      await store.getPortfolio()

      expect(store.portfolios).toBeNull()
      expect(store.error).toBe('Network error')
    })
  })

  describe('getPortfolioById', () => {
    it('returns the portfolio on success', async () => {
      vi.mocked(portfolioApi.getPortfolioByIdApi).mockResolvedValue(mockPortfolio as any)

      const store = usePortfolioStore()
      const result = await store.getPortfolioById(1)

      expect(result).toEqual(mockPortfolio)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(portfolioApi.getPortfolioByIdApi).mockRejectedValue({ message: 'Not found' })

      const store = usePortfolioStore()
      await store.getPortfolioById(999)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createPortfolio', () => {
    it('returns the created portfolio on success', async () => {
      vi.mocked(portfolioApi.createPortfolioApi).mockResolvedValue(mockPortfolio as any)

      const store = usePortfolioStore()
      const result = await store.createPortfolio({ title: 'My Portfolio', slug: 'my-portfolio', description: '' })

      expect(result).toEqual(mockPortfolio)
      expect(store.error).toBeNull()
    })

    it('sets an error when creation fails', async () => {
      vi.mocked(portfolioApi.createPortfolioApi).mockRejectedValue({ message: 'Slug already taken' })

      const store = usePortfolioStore()
      await store.createPortfolio({ title: 'My Portfolio', slug: 'taken', description: '' })

      expect(store.error).toBe('Slug already taken')
    })
  })

  describe('deletePortfolio', () => {
    it('clears the error on success', async () => {
      vi.mocked(portfolioApi.deletePortfolioApi).mockResolvedValue(undefined)

      const store = usePortfolioStore()
      store.error = 'old error'
      await store.deletePortfolio(1)

      expect(store.error).toBeNull()
    })

    it('sets an error when deletion fails', async () => {
      vi.mocked(portfolioApi.deletePortfolioApi).mockRejectedValue({ message: 'Delete failed' })

      const store = usePortfolioStore()
      await store.deletePortfolio(1)

      expect(store.error).toBe('Delete failed')
    })
  })
})
