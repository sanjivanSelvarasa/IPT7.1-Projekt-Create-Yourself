import {defineStore} from "pinia";
import {ref} from "vue";
import type {PortfolioType} from "@/types/portfolioType.ts";
import {
  createPortfolioApi, deletePortfolioApi, getFullPortfolioByIdApi, getFullPortfolioBySlugApi,
  getPortfolioByIdApi, getPortfolioBySlugApi,
  getPortoliosApi, slugAvailableApi,
  updatePortfolioByIdApi
} from "@/api/portfolio.api.ts";
import type {CreatePortfolioType} from "@/types/createPortfolioType.ts";
import {apiFetch} from "@/api/api.ts";

export const usePortfolioStore = defineStore('portfolio', () => {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const portfolios = ref<PortfolioType[] | null>(null)

  async function getPortfolio(){
    loading.value = true
    error.value = null

    try{
      portfolios.value = await getPortoliosApi()
      loading.value = false
    }catch(err){
      error.value = err ? err.message : 'Getting portfolios failed.'
    }
  }

  async function getPortfolioById(id: number){
    error.value = null

    try{
      return await getPortfolioByIdApi(id)
    }catch(err){
      error.value = err ? err.message : 'Getting portfolio by id failed.'
    }
  }

  async function getFullPortfolioById(id: number){
    error.value = null

    try{
      return await getFullPortfolioByIdApi(id)
    }catch(err){
      error.value = err ? err.message : 'Getting portfolio by id failed.'
    }
  }

  async function getPortfolioBySlug(slug: string){
    error.value = null

    try{
      return await getPortfolioBySlugApi(slug)
    }catch (err){
      error.value = err ? err.message : 'Getting portfolio by slug failed.'
    }
  }

  async function getFullPortfolioBySlug(slug: string){
    error.value = null

    try{
      return await getFullPortfolioBySlugApi(slug)
    }catch(err){
      error.value = err ? err.message : 'Getting full portfolio by slug failed.'
    }
  }

  async function createPortfolio(portfolio: CreatePortfolioType){
    error.value = null
    try{
      return await createPortfolioApi(portfolio)
    }catch(err){
      error.value = err ? err.message : 'Create portfolio failed.'
    }
  }

  async function updatePortfolio(portfolio: PortfolioType){
    error.value = null

    try{
      await updatePortfolioByIdApi(portfolio.id, portfolio)
    }catch(err){
      error.value = err ? err.message : 'Update portfolio failed.'
    }
  }

  async function deletePortfolio(id: number){
    error.value = null

    try{
      await deletePortfolioApi(id)
    }catch (err){
      error.value = err ? err.message : 'Delete portfolio failed.'
    }
  }

  async function slugAvailable(slug: string){
    error.value = null

    try{
      return await slugAvailableApi(slug)
    }catch(err){
      error.value = err ? err.message : 'Check slug failed.'
    }
  }

  return {loading, error, portfolios, getFullPortfolioBySlug, getPortfolioBySlug, getFullPortfolioById, getPortfolio, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio, slugAvailable}
})
