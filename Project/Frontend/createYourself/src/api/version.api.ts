import {apiFetch} from "@/api/api.ts";
import type {CreateVersionType} from "@/types/createVersionType.ts";
import type {ActivateVersionType} from "@/types/activateVersionType.ts";

export async function getVersionApi(portfolioId: number) {
  return await apiFetch(`/portfolio/${portfolioId}/versions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function getVersionByIdApi(portfolioId: number, versionId: number) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function createVersionApi(portfolioId: number, versionType: CreateVersionType) {
  return await apiFetch(`/portfolio/${portfolioId}/versions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      portfolioId: versionType.portfolioId,
      titleSnapshot: versionType.titleSnapshot,
      isPublished: versionType.isPublished,
    })
  })
}

export async function activateVersionApi(portfolioId: number, versionId: number) : ActivateVersionType {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}/activate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function deleteVersionApi(portfolioId: number, versionId: number) : Promise<void> {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${versionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
