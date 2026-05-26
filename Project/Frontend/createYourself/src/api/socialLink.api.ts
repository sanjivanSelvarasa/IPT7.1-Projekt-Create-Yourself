import {apiFetch} from "@/api/api.ts";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import type {CreateSocialLinkType} from "@/types/createSocialLinkType.ts";

export async function getSocialLinkApi(portoflioId: number): Promise<SocialLinkType[]> {
  return await apiFetch(`/portfolio/${portoflioId}/links`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
}

export async function createSocialLinkApi(portoflioId: number, socialLink: CreateSocialLinkType) : Promise<SocialLinkType>{
  return await apiFetch(`/portfolio/${portoflioId}/links`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      platform: socialLink.platform,
      url: socialLink.url,
    }),
  })
}

export async function updateSocialLinkApi(portoflioId: number,linkId: number, url: string){
  return await apiFetch(`/portfolio/${portoflioId}/links/${linkId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      url: url,
    })
  })
}

export async function deleteSocialLinkApi(portoflioId: number, linkId: number){
  return await apiFetch(`/portfolio/${portoflioId}/links/${linkId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
