import {defineStore} from "pinia";
import {ref} from "vue";
import type {EducationType} from "@/types/educationType.ts";
import type {CreateEducationType} from "@/types/createEducationType.ts";
import type {SkillType} from "@/types/skillType.ts";
import {createSkillApi, deleteSkillApi, getSkillsApi, updateSkillApi} from "@/api/skill.api.ts";
import type {CreateSkillType} from "@/types/createSkillType.ts";
import type {UpdateSkillType} from "@/types/updateSkillType.ts";

export const useSkillStore = defineStore('skill', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const skills = ref<SkillType[] | null>(null)

  async function getSkills(portfolioId: number) {
    error.value = null
    loading.value = true

    try{
      skills.value = await getSkillsApi(portfolioId)
      loading.value = false
    }catch(err){
      error.value = err ? err.message : 'Failed to get educations'
    }
  }

  async function createSkills(portfolioId: number, skill: CreateSkillType) : Promise<SkillType | undefined> {
    error.value = null
    try{
      return await createSkillApi(portfolioId, skill)
    }catch(err){
      error.value = err ? err.message : 'Failed to create education'
    }
  }

  async function updateSkill(portfolioId: number, skill: UpdateSkillType) {
    error.value = null

    try{
      await updateSkillApi(portfolioId, skill)
    }catch (err){
      error.value = err ? err.message : 'Failed to update education'
    }
  }

  async function deleteSkill(portfolioId: number, skillId: number) {
    error.value = null

    try{
      await deleteSkillApi(portfolioId, skillId)
    }catch(err){
      error.value = err ? err.message : 'Failed to delete education'
    }
  }

  return {error, loading, skills, getSkills, createSkills, updateSkill, deleteSkill}
})
