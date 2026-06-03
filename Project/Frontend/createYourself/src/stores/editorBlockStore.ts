import {defineStore} from "pinia";
import {ref} from "vue";
import {
  createEditorBlockApi,
  deleteEditorBlockApi,
  getEditorBlockApi,
  updateEditorBlockApi
} from "@/api/editor.api.ts";
import type {CreateEditorBlockType} from "@/types/createEditorBlockType.ts";
import type {EditorBlockType} from "@/types/editorBlockType.ts";
import type {CreateTextEditorBlockType} from "@/types/createTextEditorBlockType.ts";

export const useEditorBlockStore = defineStore('editorBlock', () => {
  const error = ref<string | null>()
  const loading = ref<boolean>(false)
  const editorBlocks = ref<EditorBlockType[] | null>(null)

  async function getEditorBlock(portfolioId: number, portfolioVersionId: number, sectionId: number) : Promise<EditorBlockType[] | undefined> {
    loading.value = true
    error.value = null
    try{
      const res = await getEditorBlockApi(portfolioId, portfolioVersionId, sectionId)
      editorBlocks.value = res
      loading.value = false
      return res
    }catch(err){
      error.value = err ? err.message : 'Failed to load editorBlock'
    }
  }

  async function createEditorBlock(portfolioId: number, portfolioVersionId: number, sectionId: number, editorBlock: CreateEditorBlockType | CreateTextEditorBlockType) {
    error.value = null

    try{
      return await createEditorBlockApi(portfolioId, portfolioVersionId, sectionId, editorBlock)
    }catch(err){
      error.value = err ? err.message : 'Failed to create editor block'
    }
  }

  async function updateEditorBlock(portfolioId: number, portfolioVersionId: number, sectionId: number, blockId: number, editorBlock: CreateEditorBlockType | CreateTextEditorBlockType) {
    error.value = null

    try{
      return await updateEditorBlockApi(portfolioId, portfolioVersionId, sectionId, blockId, editorBlock)
    }catch (err){
      error.value = err ? err.message : 'Failed to update editor block'
    }
  }

  async function deleteEditorBlock(portfolioId: number, portfolioVersionId: number, sectionId: number, blockId: number) {
    error.value = null

    try{
      await deleteEditorBlockApi(portfolioId, portfolioVersionId, sectionId, blockId)
    }catch(err){
      error.value = err ? err.message : 'Failed to delete editor block'
    }
  }

  return {error, loading, editorBlocks, getEditorBlock, createEditorBlock, deleteEditorBlock, updateEditorBlock}
})
