import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEducationStore } from '@/stores/educationStore'

vi.mock('@/api/education.api.ts', () => ({
  getEducationApi: vi.fn(),
  createEducationApi: vi.fn(),
  updateEducationApi: vi.fn(),
  deleteEducationApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as educationApi from '@/api/education.api.ts'

const mockEducation = { id: 1, institution: 'ETH Zürich', degree: 'BSc Informatik', startDate: '2020-09-01', endDate: '2024-06-30' }

describe('educationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getEducation', () => {
    it('populates educations on success', async () => {
      vi.mocked(educationApi.getEducationApi).mockResolvedValue([mockEducation] as any)

      const store = useEducationStore()
      await store.getEducation(1)

      expect(store.educations).toEqual([mockEducation])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(educationApi.getEducationApi).mockRejectedValue({ message: 'Not found' })

      const store = useEducationStore()
      await store.getEducation(1)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createEducation', () => {
    it('returns the created entry on success', async () => {
      vi.mocked(educationApi.createEducationApi).mockResolvedValue(mockEducation as any)

      const store = useEducationStore()
      const result = await store.createEducation(1, mockEducation as any)

      expect(result).toEqual(mockEducation)
      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(educationApi.createEducationApi).mockRejectedValue({ message: 'Create failed' })

      const store = useEducationStore()
      await store.createEducation(1, mockEducation as any)

      expect(store.error).toBe('Create failed')
    })
  })

  describe('updateEducation', () => {
    it('returns the updated entry on success', async () => {
      const updated = { ...mockEducation, degree: 'MSc Informatik' }
      vi.mocked(educationApi.updateEducationApi).mockResolvedValue(updated as any)

      const store = useEducationStore()
      const result = await store.updateEducation(1, 1, updated as any)

      expect(result).toEqual(updated)
    })

    it('sets an error on failure', async () => {
      vi.mocked(educationApi.updateEducationApi).mockRejectedValue({ message: 'Update failed' })

      const store = useEducationStore()
      await store.updateEducation(1, 1, mockEducation as any)

      expect(store.error).toBe('Update failed')
    })
  })

  describe('deleteEducation', () => {
    it('clears the error on success', async () => {
      vi.mocked(educationApi.deleteEducationApi).mockResolvedValue(undefined)

      const store = useEducationStore()
      store.error = 'old'
      await store.deleteEducation(1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(educationApi.deleteEducationApi).mockRejectedValue({ message: 'Delete failed' })

      const store = useEducationStore()
      await store.deleteEducation(1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
