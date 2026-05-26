import {apiFetch} from "@/api/api.ts";
import type {CreateEditorBlockType} from "@/types/createEditorBlockType.ts";

export async function getEditorBlockApi(portfolioId: number, portfolioVersionId: number, sectionId: number) : Promise<CreateEditorBlockType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${portfolioVersionId}/sections/${sectionId}/blocks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function createEditorBlockApi(portfolioId: number, portfolioVersionId: number, sectionId: number, editorBlock: CreateEditorBlockType) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${portfolioVersionId}/sections/${sectionId}/blocks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      blockType: editorBlock.blockType,
      contentJson: editorBlock.contentJson,
      sortOrder: editorBlock.sortOrder,
    })
  })
}

export async function updateEditorBlockApi(portfolioId: number, portfolioVersionId: number, sectionId: number, blockId: number, editorBlock: CreateEditorBlockType) {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${portfolioVersionId}/sections/${sectionId}/blocks/${blockId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      blockType: editorBlock.blockType,
      contentJson: editorBlock.contentJson,
      sortOrder: editorBlock.sortOrder,
    })
  })
}

export async function deleteEditorBlockApi(portfolioId: number, portfolioVersionId: number, sectionId: number, blockId: number) : Promise<void> {
  return await apiFetch(`/portfolio/${portfolioId}/versions/${portfolioVersionId}/sections/${sectionId}/blocks/${blockId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
