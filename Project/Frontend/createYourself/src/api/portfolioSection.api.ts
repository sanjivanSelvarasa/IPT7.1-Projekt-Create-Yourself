import {apiFetch} from "@/api/api.ts";
import type {CreateSectionType} from "@/types/createSectionType.ts";
import type {SectionType} from "@/types/sectionType.ts";

export async function getSectionsApi(portfolioId: number, versionId: number) : Promise<SectionType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}/sections`, {
    method: 'GET',
    headers: {
      'Authorization': `BEARER ${localStorage.getItem('token')}`,
    }
  })
}

export async function createSectionApi(portfolioId: number, versionId: number, section: CreateSectionType) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}/sections`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      sectionType: section.sectionType,
      title: section.title,
      sortOrder: section.sortOrder,
      isVisible: section.isVisible,
    })
  })
}

export async function updateSectionApi(portfolioId: number, versionId: number, sectionId: number, section: CreateSectionType) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}/sections/${sectionId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      sectionType: section.sectionType,
      title: section.title,
      sortOrder: section.sortOrder,
      isVisible: section.isVisible,
    })
  })
}

export async function deleteSectionApi(portfolioId: number, versionId: number, sectionId: number) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}/sections/${sectionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
