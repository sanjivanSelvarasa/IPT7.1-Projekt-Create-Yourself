import {defineStore} from "pinia";
import {ref} from "vue";
import type {EducationType} from "@/types/educationType.ts";
import {
  createExperienceApi,
  deleteExperienceApi,
  getExperienceApi,
  updateExperienceApi
} from "@/api/experience.api.ts";
import type {ExperienceType} from "@/types/experienceType.ts";
import type {CreateExperienceType} from "@/types/createExperienceType.ts";

export const useExperienceStore = defineStore('experience', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const experiences = ref<ExperienceType[] | null>(null)

  async function getExperience(portfolioId: number) {
    error.value = null
    loading.value = true

    try{
      experiences.value = await getExperienceApi(portfolioId)
      loading.value = false
    }catch(err){
      error.value = err ? err.message : 'Failed to get educations'
    }
  }

  async function createExperience(portfolioId: number, experience: CreateExperienceType) {
    error.value = null

    try{
      return await createExperienceApi(portfolioId, experience)
    }catch (err){
      error.value = err ? err.message : 'Failed to create education'
    }
  }

  async function updateExperience(portfolioId: number, experienceId: number, experience: CreateExperienceType) {
    error.value = null

    try{
      return await updateExperienceApi(portfolioId, experienceId, experience)
    }catch (err){
      error.value = err ? err.message : 'Failed to update education'
    }
  }

  async function deleteExperience(portfolioId: number, experienceId: number) {
    error.value = null

    try{
      await deleteExperienceApi(portfolioId, experienceId)
    }catch (err){
      error.value = err ? err.message : 'Failed to delete education'
    }
  }

  return {error, loading, experiences, getExperience, createExperience, updateExperience, deleteExperience}
})
