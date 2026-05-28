import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSkillStore } from '@/stores/skillStore'

vi.mock('@/api/skill.api.ts', () => ({
  getSkillsApi: vi.fn(),
  createSkillApi: vi.fn(),
  updateSkillApi: vi.fn(),
  deleteSkillApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as skillApi from '@/api/skill.api.ts'

const mockSkill = { id: 1, name: 'TypeScript', level: 90 }

describe('skillStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getSkills', () => {
    it('populates skills on success', async () => {
      vi.mocked(skillApi.getSkillsApi).mockResolvedValue([mockSkill] as any)

      const store = useSkillStore()
      await store.getSkills(1)

      expect(store.skills).toEqual([mockSkill])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(skillApi.getSkillsApi).mockRejectedValue({ message: 'Not found' })

      const store = useSkillStore()
      await store.getSkills(1)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createSkills', () => {
    it('returns the created skill on success', async () => {
      vi.mocked(skillApi.createSkillApi).mockResolvedValue(mockSkill as any)

      const store = useSkillStore()
      const result = await store.createSkills(1, { name: 'TypeScript', level: 90 })

      expect(result).toEqual(mockSkill)
      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(skillApi.createSkillApi).mockRejectedValue({ message: 'Create failed' })

      const store = useSkillStore()
      await store.createSkills(1, { name: 'X', level: 0 })

      expect(store.error).toBe('Create failed')
    })
  })

  describe('deleteSkill', () => {
    it('clears the error on success', async () => {
      vi.mocked(skillApi.deleteSkillApi).mockResolvedValue(undefined)

      const store = useSkillStore()
      store.error = 'old'
      await store.deleteSkill(1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(skillApi.deleteSkillApi).mockRejectedValue({ message: 'Delete failed' })

      const store = useSkillStore()
      await store.deleteSkill(1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
