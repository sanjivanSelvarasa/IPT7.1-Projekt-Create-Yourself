import {apiFetch} from "@/api/api.ts";
import type {CreatePortfolioType} from "@/types/createPortfolioType.ts";
import type {PortfolioType} from "@/types/portfolioType.ts";

export async function getPortolioApi(token: string){
    return await apiFetch(`/portfolio`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
}

export async function getPortfolioByIdApi(id: number, token: string){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function createPortfolioApi(portfolio: CreatePortfolioType, token: string){
  return await apiFetch(`/portfolio`, {
    method: 'POST',
    body: JSON.stringify({
      portfolio
    }),
    headers: {
      Authorization: `BEARER ${token}`
    }
  })
}

export async function updatePortfolioByIdApi(id: number, portfolio: PortfolioType ,token: string){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function deletePortfolioApi(id: number, token: string){
  return await apiFetch(`/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
