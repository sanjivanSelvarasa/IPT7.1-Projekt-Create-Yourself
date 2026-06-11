import {apiFetch} from "@/api/api.ts";
import type {CreateProjectType} from "@/types/createProjectType.ts";
import type {ProjectType} from "@/types/projectType.ts";

export async function getProjectApi(portfolioId:number) : Promise<ProjectType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/projects`, {
    method: 'GET',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    }
  })
}

export async function createProjectApi(portfolioId:number, project: CreateProjectType) : Promise<ProjectType> {
  return await apiFetch(`/portfolio/${portfolioId}/projects`, {
    method: 'POST',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      sortOrder: project.sortOrder,
      startDate: project.startDate,
      endDate: project.endDate,
    }),
  })
}

export async function updateProjectApi(portfolioId:number, projectId:number, project: CreateProjectType) : Promise<ProjectType>{
  return await apiFetch(`/portfolio/${portfolioId}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      sortOrder: project.sortOrder,
      startDate: project.startDate,
      endDate: project.endDate,
    })
  })
}

export async function deleteProjectApi(portfolioId:number, projectId:number) : Promise<void> {
  return await apiFetch(`/portfolio/${portfolioId}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    }
  })
}

export async function createProjectImageApi(portfolioId:number, projectId:number, image: File) {
  const formData = new FormData();
  formData.append('image', image)

  return await apiFetch(`/portfolio/${portfolioId}/projects/${projectId}/image`, {
    method: 'POST',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    },
    body: formData
  })
}
