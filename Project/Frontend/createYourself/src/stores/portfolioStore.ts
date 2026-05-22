import {defineStore} from "pinia";
import {ref} from "vue";
import type {PortfolioType} from "@/types/portfolioType.ts";
import {
  createPortfolioApi, deletePortfolioApi,
  getPortfolioByIdApi,
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
      error.value = err ? err.message : 'Getting Portfolios failed.'
    }
  }

  async function getPortfolioById(id: number){
    error.value = null

    try{
      return await getPortfolioByIdApi(id)
    }catch(err){
      error.value = err ? err.message : 'Getting Portfolio by id failed.'
    }
  }

  async function createPortfolio(portfolio: CreatePortfolioType){
    error.value = null
    try{
      return await createPortfolioApi(portfolio)
    }catch(err){
      error.value = err ? err.message : 'Create Portfolio failed.'
    }
  }

  async function updatePortfolio(portfolio: PortfolioType){
    error.value = null

    try{
      await updatePortfolioByIdApi(portfolio.id, portfolio)
    }catch(err){
      error.value = err ? err.message : 'Update Portfolio failed.'
    }
  }

  async function deletePortfolio(id: number){
    error.value = null

    try{
      await deletePortfolioApi(id)
    }catch (err){
      error.value = err ? err.message : 'Delete Portfolio failed.'
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

  return {loading, error, portfolios, getPortfolio, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio, slugAvailable}
})
