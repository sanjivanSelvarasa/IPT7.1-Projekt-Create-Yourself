import {apiFetch} from "@/api/api.ts";
import type {CreateExperienceType} from "@/types/createExperienceType.ts";
import type {ExperienceType} from "@/types/experienceType.ts";

export async function getExperienceApi(portfolioId: number) : Promise<ExperienceType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/experiences`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function createExperienceApi(portfolioId: number, experience: CreateExperienceType) : Promise<ExperienceType> {
  return await apiFetch(`/portfolio/${portfolioId}/experiences`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      companyName: experience.companyName,
      position: experience.position,
      description: experience.description,
      sortOrder: experience.sortOrder,
      startDate: experience.startDate,
      endDate: experience.endDate,
    })
  })
}

export async function updateExperienceApi(portfolioId: number, experienceId: number, experience: CreateExperienceType) : Promise<ExperienceType>{
  return await apiFetch(`/portfolio/${portfolioId}/experiences/${experienceId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      companyName: experience.companyName,
      position: experience.position,
      description: experience.description,
      sortOrder: experience.sortOrder,
      startDate: experience.startDate,
      endDate: experience.endDate,
    })
  })
}

export async function deleteExperienceApi(portfolioId: number, experienceId: number) : Promise<void> {
  return await apiFetch(`/portfolio/${portfolioId}/experiences/${experienceId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
