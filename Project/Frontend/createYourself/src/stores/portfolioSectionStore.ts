import {defineStore} from "pinia";
import {ref} from "vue";
import type {SectionType} from "@/types/sectionType.ts";
import {
  createSectionApi,
  deleteSectionApi,
  getSectionsApi,
  updateSectionApi
} from "@/api/portfolioSection.api.ts";
import type {CreateSectionType} from "@/types/createSectionType.ts";

export const usePortfolioSectionStore = defineStore('portfolioSection', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const sections = ref<SectionType[]>([])

  async function getSections(portfolioId: number, versionId: number){
    error.value = null
    loading.value = true

    try{
      sections.value = await getSectionsApi(portfolioId, versionId)
      loading.value = false
    } catch(err){
      error.value = err ? err.message : 'Failed to get sections'
    }
  }

  async function createSection(portfolioId: number, versionId: number, section: CreateSectionType){
    error.value = null

    try{
      return await createSectionApi(portfolioId, versionId, section)
    }catch(err){
      error.value = err ? err.message : 'Failed to create section'
    }
  }

  async function updateSection(portfolioId: number, versionId: number, sectionId: number, section: CreateSectionType){
    error.value = null

    try{
      return await updateSectionApi(portfolioId, versionId, sectionId, section)
    }catch(err){
      error.value = err ? err.message : 'Failed to update section'
    }
  }

  async function deleteSection(portfolioId: number, versionId: number, sectionId: number){
    error.value = null

    try{
      await deleteSectionApi(portfolioId, versionId, sectionId)
    }catch(err){
      error.value = err ? err.message : 'Failed to delete section'
    }
  }

  return {getSections, createSection, updateSection, deleteSection, error, loading, sections}
})
