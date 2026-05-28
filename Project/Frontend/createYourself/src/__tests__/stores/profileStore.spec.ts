import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'

vi.mock('@/api/profile.api.ts', () => ({
  getProfileApi: vi.fn(),
  updateProfileApi: vi.fn(),
  updateProfilePictureApi: vi.fn(),
  updateLanguageApi: vi.fn(),
  updatePasswordApi: vi.fn(),
  deleteAccountApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as profileApi from '@/api/profile.api.ts'

const mockProfile = {
  id: 1,
  firstname: 'Max',
  lastname: 'Muster',
  username: 'mmuster',
  email: 'max@example.com',
  bio: '',
  preferredLanguage: 'de',
}

describe('profileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getProfile', () => {
    it('stores profile data on success', async () => {
      vi.mocked(profileApi.getProfileApi).mockResolvedValue(mockProfile as any)

      const store = useProfileStore()
      await store.getProfile()

      expect(store.profileData).toEqual(mockProfile)
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(profileApi.getProfileApi).mockRejectedValue({ message: 'Unauthorized' })

      const store = useProfileStore()
      await store.getProfile()

      expect(store.profileData).toBeNull()
    })
  })

  describe('updateProfile', () => {
    it('returns and stores updated profile on success', async () => {
      const updated = { ...mockProfile, bio: 'Hello' }
      vi.mocked(profileApi.updateProfileApi).mockResolvedValue(updated as any)

      const store = useProfileStore()
      const result = await store.updateProfile({ firstname: 'Max', lastname: 'Muster', username: 'mmuster', email: 'max@example.com', bio: 'Hello' })

      expect(result).toEqual(updated)
      expect(store.profileData).toEqual(updated)
    })

    it('sets an error and re-throws on failure', async () => {
      vi.mocked(profileApi.updateProfileApi).mockRejectedValue({ message: 'Validation failed' })

      const store = useProfileStore()
      await expect(store.updateProfile({ firstname: '', lastname: '', username: '', email: '', bio: '' })).rejects.toBeTruthy()
    })
  })

  describe('updateLanguage', () => {
    it('stores the preferred language on success', async () => {
      vi.mocked(profileApi.updateLanguageApi).mockResolvedValue({ language_code: 'en' } as any)

      const store = useProfileStore()
      await store.updateLanguage('en')

      expect(store.prefLanguage).toEqual({ language_code: 'en' })
    })

    it('sets an error and re-throws on failure', async () => {
      vi.mocked(profileApi.updateLanguageApi).mockRejectedValue({ message: 'Invalid language' })

      const store = useProfileStore()
      await expect(store.updateLanguage('xx')).rejects.toBeTruthy()
    })
  })

  describe('deleteProfile', () => {
    it('clears the error on success', async () => {
      vi.mocked(profileApi.deleteAccountApi).mockResolvedValue(undefined)

      const store = useProfileStore()
      store.error = 'old error'
      await store.deleteProfile()

      expect(store.error).toBeNull()
    })

    it('sets an error and re-throws on failure', async () => {
      vi.mocked(profileApi.deleteAccountApi).mockRejectedValue({ message: 'Cannot delete' })

      const store = useProfileStore()
      await expect(store.deleteProfile()).rejects.toBeTruthy()
    })
  })
})
