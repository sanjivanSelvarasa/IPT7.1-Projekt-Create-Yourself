import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEditorBlockStore } from '@/stores/editorBlockStore'

vi.mock('@/api/editor.api.ts', () => ({
  getEditorBlockApi: vi.fn(),
  createEditorBlockApi: vi.fn(),
  updateEditorBlockApi: vi.fn(),
  deleteEditorBlockApi: vi.fn(),
}))

vi.mock('@/api/api.ts', () => ({ apiFetch: vi.fn() }))

import * as editorApi from '@/api/editor.api.ts'

const mockBlock = { id: 1, type: 'text', content: 'Hello World', order: 0 }

describe('editorBlockStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getEditorBlock', () => {
    it('stores and returns blocks on success', async () => {
      vi.mocked(editorApi.getEditorBlockApi).mockResolvedValue([mockBlock] as any)

      const store = useEditorBlockStore()
      const result = await store.getEditorBlock(1, 1, 1)

      expect(result).toEqual([mockBlock])
      expect(store.editorBlocks).toEqual([mockBlock])
      expect(store.error).toBeNull()
      expect(store.loading).toBe(false)
    })

    it('sets an error when the API call fails', async () => {
      vi.mocked(editorApi.getEditorBlockApi).mockRejectedValue({ message: 'Not found' })

      const store = useEditorBlockStore()
      const result = await store.getEditorBlock(1, 1, 1)

      expect(result).toBeUndefined()
      expect(store.error).toBe('Not found')
    })
  })

  describe('createEditorBlock', () => {
    it('returns the created block on success', async () => {
      vi.mocked(editorApi.createEditorBlockApi).mockResolvedValue(mockBlock as any)

      const store = useEditorBlockStore()
      const result = await store.createEditorBlock(1, 1, 1, { type: 'text', content: 'Hello World', order: 0 })

      expect(result).toEqual(mockBlock)
      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(editorApi.createEditorBlockApi).mockRejectedValue({ message: 'Create failed' })

      const store = useEditorBlockStore()
      await store.createEditorBlock(1, 1, 1, { type: 'text', content: '', order: 0 })

      expect(store.error).toBe('Create failed')
    })
  })

  describe('updateEditorBlock', () => {
    it('returns the updated block on success', async () => {
      const updated = { ...mockBlock, content: 'Updated' }
      vi.mocked(editorApi.updateEditorBlockApi).mockResolvedValue(updated as any)

      const store = useEditorBlockStore()
      const result = await store.updateEditorBlock(1, 1, 1, 1, { type: 'text', content: 'Updated', order: 0 })

      expect(result).toEqual(updated)
    })

    it('sets an error on failure', async () => {
      vi.mocked(editorApi.updateEditorBlockApi).mockRejectedValue({ message: 'Update failed' })

      const store = useEditorBlockStore()
      await store.updateEditorBlock(1, 1, 1, 99, { type: 'text', content: '', order: 0 })

      expect(store.error).toBe('Update failed')
    })
  })

  describe('deleteEditorBlock', () => {
    it('clears the error on success', async () => {
      vi.mocked(editorApi.deleteEditorBlockApi).mockResolvedValue(undefined)

      const store = useEditorBlockStore()
      store.error = 'old'
      await store.deleteEditorBlock(1, 1, 1, 1)

      expect(store.error).toBeNull()
    })

    it('sets an error on failure', async () => {
      vi.mocked(editorApi.deleteEditorBlockApi).mockRejectedValue({ message: 'Delete failed' })

      const store = useEditorBlockStore()
      await store.deleteEditorBlock(1, 1, 1, 99)

      expect(store.error).toBe('Delete failed')
    })
  })
})
