import {apiFetch} from "@/api/api.ts";
import type {CreatePortfolioType} from "@/types/createPortfolioType.ts";
import type {PortfolioType} from "@/types/portfolioType.ts";

export async function getPortoliosApi() : Promise<PortfolioType[]>{
    return await apiFetch(`/portfolios`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
}

export async function getPortfolioByIdApi(id: number) : Promise<PortfolioType>{
  return await apiFetch(`/portfolio/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function getFullPortfolioByIdApi(id: number) : Promise<PortfolioType>{
  return await apiFetch(`/portfolio/${id}/full`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function getPortfolioBySlugApi(slug: string) : Promise<PortfolioType>{
  return await apiFetch(`/p/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function getFullPortfolioBySlugApi(slug: string) : Promise<PortfolioType>{
  return await apiFetch(`/p/${slug}/full`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function createPortfolioApi(portfolio: CreatePortfolioType){
  return await apiFetch(`/portfolio`, {
    method: 'POST',
    body: JSON.stringify({
      title: portfolio.title,
      description: portfolio.description,
      slug: portfolio.slug,
      visibility: portfolio.visibility,
    }),
    headers: {
      Authorization: `BEARER ${localStorage.getItem('token')}`
    }
  })
}

export async function updatePortfolioByIdApi(id: number, portfolio: PortfolioType){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      title: portfolio.title,
      description: portfolio.description,
      slug: portfolio.slug,
      visibility: portfolio.visibility,
      templateId: portfolio.templateId,
      languageCode: portfolio.languageCode,
      currentThemeId: portfolio.currentThemeId,
    })
  })
}

export async function deletePortfolioApi(id: number){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export async function slugAvailableApi(slug: string) : Promise<boolean>{
  return await apiFetch(`/p/${slug}/available`, {
    method: 'GET',
  })
}
