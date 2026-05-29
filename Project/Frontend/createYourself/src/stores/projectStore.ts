import {defineStore} from "pinia";
import {ref} from "vue";
import type {CreateProjectType} from "@/types/createProjectType.ts";
import {
  createProjectApi, createProjectImageApi,
  deleteProjectApi,
  getProjectApi,
  updateProjectApi
} from "@/api/project.api.ts";
import project from "@/components/ui/editor/Project.vue";
import type {ProjectType} from "@/types/projectType.ts";

export const useProjectStore = defineStore('project', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const projects = ref<ProjectType[] | null>(null)

  async function getProjects(portfolioId: number) : Promise<void> {
    error.value = null
    loading.value = true

    try{
      projects.value = await getProjectApi(portfolioId)
      loading.value = false
    }catch(err){
      error.value = err ? err.message : 'Failed to get projects'
    }
  }

  async function createProject(portfolioId: number, project: CreateProjectType) : Promise<ProjectType | undefined>{
    error.value = null

    try{
      return await createProjectApi(portfolioId, project)
    }catch(err){
      error.value = err ? err.message : 'Failed to create project'
    }
  }

  async function updateProject(portfolioId: number, projectId: number, project: CreateProjectType) : Promise<ProjectType | undefined>{
    error.value = null

    try{
      return await updateProjectApi(portfolioId, projectId, project)
    }catch(err){
      error.value = err ? err.message : 'Failed to update project'
    }
  }

  async function deleteProject(portfolioId: number, projectId: number) : Promise<void>{
    error.value = null

    try{
      await deleteProjectApi(portfolioId, projectId)
    }catch (err){
      error.value = err ? err.message : 'Failed to delete project'
    }
  }

  async function createProjectImage(portfolioId:number, projectId:number, image: File){
    error.value = null

    try{
      await createProjectImageApi(portfolioId, projectId, image)
    }catch(err){
      error.value = err ? err.message : 'Failed to create project'
    }
  }

  return {error, loading, projects, createProject, getProjects, updateProject, deleteProject, createProjectImage}
})
