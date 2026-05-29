import {defineStore} from "pinia";
import {ref} from "vue";
import {
  createEducationApi,
  deleteEducationApi,
  getEducationApi,
  updateEducationApi
} from "@/api/education.api.ts";
import type {EducationType} from "@/types/educationType.ts";
import type {CreateEditorBlockType} from "@/types/createEditorBlockType.ts";
import type {CreateEducationType} from "@/types/createEducationType.ts";

export const useEducationStore = defineStore('education', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const educations = ref<EducationType[] | null>(null)

  async function getEducation(portfolioId: number) : Promise<void> {
    error.value = null
    loading.value = true

    try{
      educations.value = await getEducationApi(portfolioId)
      loading.value = false
    }catch(err){
      error.value = err ? err.message : 'Failed to get Education'
    }
  }

  async function createEducation(portfolioId: number, education: CreateEducationType) : Promise<EducationType | undefined> {
    error.value = null

    try{
      return await createEducationApi(portfolioId, education)
    }catch(err){
      error.value = err ? err.message : 'Failed to create Education'
    }
  }

  async function updateEducation(portfolioId: number, educationId: number, education: EducationType) : Promise<EducationType | undefined> {
    error.value = null

    try{
      return await updateEducationApi(portfolioId, educationId, education)
    }catch (err){
      error.value = err ? err.message : 'Failed to update Education'
    }
  }

  async function deleteEducation(portfolioId: number, educationId: number) : Promise<void> {
    error.value = null

    try{
      await deleteEducationApi(portfolioId, educationId)
    }catch(err){
      error.value = err ? err.message : 'Failed to delete Education'
    }
  }

  return {error, loading, educations, getEducation, createEducation, updateEducation, deleteEducation};
})
