import {defineStore} from "pinia";
import {ref} from "vue";
import {
  activateVersionApi,
  createVersionApi,
  deleteVersionApi,
  getVersionApi
} from "@/api/version.api.ts";
import type {CreateVersionType} from "@/types/createVersionType.ts";
import type {ActivateVersionType} from "@/types/activateVersionType.ts";

export const useVersionStore = defineStore('version', () => {
  const error = ref<string | null>()
  const versions = ref<any | null>()

  async function getVersion(portfolioId: number) {
    error.value = null

    try{
      versions.value = await getVersionApi(portfolioId)
    }catch(err){
      error.value = err ? err.message : 'Failed to get version.'
    }
  }

  async function getVersionById(portfolioId: number) {
    error.value = null

    try{
      return await getVersionApi(portfolioId)
    }catch(err){
      error.value = err ? err.message : 'Failed to get version by id.'
    }
  }

  async function createVersion(portfolioId: number, versionType: CreateVersionType) {
    error.value = null

    try{
      return await createVersionApi(portfolioId, versionType)
    }catch (err){
      error.value = err ? err.message : 'Failed to create version.'
    }
  }

  async function activateVersion(portfolioId: number, versionId: number) : Promise<ActivateVersionType | undefined> {
    error.value = null

    try{
      return await activateVersionApi(portfolioId, versionId)
    }catch(err){
      error.value = err ? err.message : 'Failed to activate version.'
    }
  }

  async function deleteVersion(portfolioId: number, versionId: number) {
    error.value = null

    try{
      return await deleteVersionApi(portfolioId, versionId)
    }catch (err){
      error.value = err ? err.message : 'Failed to delete version.'
    }
  }

  return {error, versions, getVersion, getVersionById, createVersion, deleteVersion, activateVersion}
})
