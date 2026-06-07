import {apiFetch} from "@/api/api.ts";
import type {CreateSkillType} from "@/types/createSkillType.ts";
import type {SkillType} from "@/types/skillType.ts";
import type {UpdateSkillType} from "@/types/updateSkillType.ts";

export async function getSkillsApi(portfolioId: number) : Promise<SkillType[]> {
  return await apiFetch(`/portfolio/${portfolioId}/skills`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function createSkillApi(portfolioId: number, skill: CreateSkillType ) : Promise<SkillType> {
  return await apiFetch(`/portfolio/${portfolioId}/skills`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: skill.name,
      description: skill.description,
      level: skill.level,
      sortOrder: skill.sortOrder,
    })
  })
}

export async function updateSkillApi(portfolioId: number, skill: UpdateSkillType ) : Promise<SkillType> {
  return await apiFetch(`/portfolio/${portfolioId}/skills/${skill.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      level: skill.level,
      sortOrder: skill.sortOrder,
      name: skill.name,
    })
  })
}

export async function deleteSkillApi(portfolioId: number, skillId: number) {
  return await apiFetch(`/portfolio/${portfolioId}/skills/${skillId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
