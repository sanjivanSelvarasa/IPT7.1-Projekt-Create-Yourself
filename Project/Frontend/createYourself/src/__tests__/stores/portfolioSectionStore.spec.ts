import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioSectionStore } from '@/stores/portfolioSectionStore'

vi.mock('@/api/portfolioSection.api.ts', () => ({
  getSectionsApi: vi.fn(),
  createSectionApi: vi.fn(),
  updateSectionApi: vi.fn(),
  deleteSectionApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as sectionApi from '@/api/portfolioSection.api.ts'

const mockSection = { id: 1, title: 'About Me', order: 0 }

describe('portfolioSectionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getSections', () => {
    it('populates sections on success', async () => {
      vi.mocked(sectionApi.getSectionsApi).mockResolvedValue([mockSection] as any)

      const store = usePortfolioSectionStore()
      await store.getSections(1, 1)

      expect(store.sections).toEqual([mockSection])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(sectionApi.getSectionsApi).mockRejectedValue({ message: 'Not found' })

      const store = usePortfolioSectionStore()
      await store.getSections(1, 1)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createSection', () => {
    it('clears the error on success', async () => {
      vi.mocked(sectionApi.createSectionApi).mockResolvedValue(undefined)

      const store = usePortfolioSectionStore()
      store.error = 'old'
      await store.createSection(1, 1, { title: 'Skills', order: 1 })

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(sectionApi.createSectionApi).mockRejectedValue({ message: 'Create failed' })

      const store = usePortfolioSectionStore()
      await store.createSection(1, 1, { title: 'Skills', order: 1 })

      expect(store.error).toBe('Create failed')
    })
  })

  describe('updateSection', () => {
    it('clears the error on success', async () => {
      vi.mocked(sectionApi.updateSectionApi).mockResolvedValue(undefined)

      const store = usePortfolioSectionStore()
      store.error = 'old'
      await store.updateSection(1, 1, 1, { title: 'Updated', order: 0 })

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(sectionApi.updateSectionApi).mockRejectedValue({ message: 'Update failed' })

      const store = usePortfolioSectionStore()
      await store.updateSection(1, 1, 1, { title: 'X', order: 0 })

      expect(store.error).toBe('Update failed')
    })
  })

  describe('deleteSection', () => {
    it('clears the error on success', async () => {
      vi.mocked(sectionApi.deleteSectionApi).mockResolvedValue(undefined)

      const store = usePortfolioSectionStore()
      store.error = 'old'
      await store.deleteSection(1, 1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(sectionApi.deleteSectionApi).mockRejectedValue({ message: 'Delete failed' })

      const store = usePortfolioSectionStore()
      await store.deleteSection(1, 1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
