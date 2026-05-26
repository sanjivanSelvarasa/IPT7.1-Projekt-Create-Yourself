import type {EducationType} from "@/types/educationType.ts";
import {apiFetch} from "@/api/api.ts";
import type {CreateEducationType} from "@/types/createEducationType.ts";

export async function getEducationApi(portfolioId: number) : Promise<EducationType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/educations`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function createEducationApi(portfolioId: number, education: CreateEducationType) : Promise<EducationType> {
  return await apiFetch(`/portfolio/${portfolioId}/educations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      institutionName: education.institutionName,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      sortOrder: education.sortOrder,
      startDate: education.startDate,
      endDate: education.endDate,
    })
  })
}

export async function updateEducationApi(portfolioId: number, educationId: number, education: CreateEducationType) : Promise<EducationType> {
  return await apiFetch(`/portfolio/${portfolioId}/educations/${educationId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      institutionName: education.institutionName,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      sortOrder: education.sortOrder,
      startDate: education.startDate,
      endDate: education.endDate,
    })
  })
}

export async function deleteEducationApi(portfolioId: number, educationId: number) : Promise<void> {
  return await apiFetch(`/portfolio/${portfolioId}/educations/${educationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
