import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSocialLinkStore } from '@/stores/socialLinkStore'

vi.mock('@/api/socialLink.api.ts', () => ({
  getSocialLinkApi: vi.fn(),
  createSocialLinkApi: vi.fn(),
  updateSocialLinkApi: vi.fn(),
  deleteSocialLinkApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as socialLinkApi from '@/api/socialLink.api.ts'

const mockLink = { id: 1, platform: 'GitHub', url: 'https://github.com/user' }

describe('socialLinkStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getSocialLink', () => {
    it('populates social links on success', async () => {
      vi.mocked(socialLinkApi.getSocialLinkApi).mockResolvedValue([mockLink] as any)

      const store = useSocialLinkStore()
      await store.getSocialLink(1)

      expect(store.socialLinks).toEqual([mockLink])
      expect(store.error).toBeNull()
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(socialLinkApi.getSocialLinkApi).mockRejectedValue({ message: 'Not found' })

      const store = useSocialLinkStore()
      await store.getSocialLink(1)

      expect(store.error).toBe('Not found')
    })
  })

  describe('createSocialLink', () => {
    it('returns the created link on success', async () => {
      vi.mocked(socialLinkApi.createSocialLinkApi).mockResolvedValue(mockLink as any)

      const store = useSocialLinkStore()
      const result = await store.createSocialLink(1, mockLink as any)

      expect(result).toEqual(mockLink)
      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(socialLinkApi.createSocialLinkApi).mockRejectedValue({ message: 'Create failed' })

      const store = useSocialLinkStore()
      await store.createSocialLink(1, mockLink as any)

      expect(store.error).toBe('Create failed')
    })
  })

  describe('updateSocialLink', () => {
    it('returns the updated link on success', async () => {
      const updated = { ...mockLink, url: 'https://github.com/newuser' }
      vi.mocked(socialLinkApi.updateSocialLinkApi).mockResolvedValue(updated as any)

      const store = useSocialLinkStore()
      const result = await store.updateSocialLink(1, 1, 'https://github.com/newuser')

      expect(result).toEqual(updated)
    })

    it('sets an error on failure', async () => {
      vi.mocked(socialLinkApi.updateSocialLinkApi).mockRejectedValue({ message: 'Update failed' })

      const store = useSocialLinkStore()
      await store.updateSocialLink(1, 1, 'bad-url')

      expect(store.error).toBe('Update failed')
    })
  })

  describe('deleteSocialLink', () => {
    it('clears the error on success', async () => {
      vi.mocked(socialLinkApi.deleteSocialLinkApi).mockResolvedValue(undefined)

      const store = useSocialLinkStore()
      store.error = 'old'
      await store.deleteSocialLink(1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(socialLinkApi.deleteSocialLinkApi).mockRejectedValue({ message: 'Delete failed' })

      const store = useSocialLinkStore()
      await store.deleteSocialLink(1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
