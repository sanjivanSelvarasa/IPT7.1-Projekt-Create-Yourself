import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useExperienceStore } from '@/stores/experienceStore'

vi.mock('@/api/experience.api.ts', () => ({
  getExperienceApi: vi.fn(),
  createExperienceApi: vi.fn(),
  updateExperienceApi: vi.fn(),
  deleteExperienceApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as experienceApi from '@/api/experience.api.ts'

const mockExperience = { id: 1, company: 'Acme AG', role: 'Frontend Developer', startDate: '2022-01-01', endDate: null }

describe('experienceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getExperience', () => {
    it('populates experiences on success', async () => {
      vi.mocked(experienceApi.getExperienceApi).mockResolvedValue([mockExperience] as any)

      const store = useExperienceStore()
      await store.getExperience(1)

      expect(store.experiences).toEqual([mockExperience])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(experienceApi.getExperienceApi).mockRejectedValue({ message: 'Not found' })

      const store = useExperienceStore()
      await store.getExperience(1)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createExperience', () => {
    it('returns the created entry on success', async () => {
      vi.mocked(experienceApi.createExperienceApi).mockResolvedValue(mockExperience as any)

      const store = useExperienceStore()
      const result = await store.createExperience(1, mockExperience as any)

      expect(result).toEqual(mockExperience)
      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(experienceApi.createExperienceApi).mockRejectedValue({ message: 'Create failed' })

      const store = useExperienceStore()
      await store.createExperience(1, mockExperience as any)

      expect(store.error).toBe('Create failed')
    })
  })

  describe('updateExperience', () => {
    it('returns the updated entry on success', async () => {
      const updated = { ...mockExperience, role: 'Senior Developer' }
      vi.mocked(experienceApi.updateExperienceApi).mockResolvedValue(updated as any)

      const store = useExperienceStore()
      const result = await store.updateExperience(1, 1, updated as any)

      expect(result).toEqual(updated)
    })

    it('sets an error on failure', async () => {
      vi.mocked(experienceApi.updateExperienceApi).mockRejectedValue({ message: 'Update failed' })

      const store = useExperienceStore()
      await store.updateExperience(1, 1, mockExperience as any)

      expect(store.error).toBe('Update failed')
    })
  })

  describe('deleteExperience', () => {
    it('clears the error on success', async () => {
      vi.mocked(experienceApi.deleteExperienceApi).mockResolvedValue(undefined)

      const store = useExperienceStore()
      store.error = 'old'
      await store.deleteExperience(1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(experienceApi.deleteExperienceApi).mockRejectedValue({ message: 'Delete failed' })

      const store = useExperienceStore()
      await store.deleteExperience(1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
