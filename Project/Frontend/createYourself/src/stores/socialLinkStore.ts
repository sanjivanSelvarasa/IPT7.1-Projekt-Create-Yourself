import {defineStore} from "pinia";
import {ref} from "vue";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import {
  createSocialLinkApi,
  deleteSocialLinkApi,
  getSocialLinkApi,
  updateSocialLinkApi
} from "@/api/socialLink.api.ts";
import type {CreateSocialLinkType} from "@/types/createSocialLinkType.ts";

export const useSocialLinkStore = defineStore('socialLink', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const socialLinks = ref<SocialLinkType[] | null>(null)

  async function getSocialLink(portfolioId: number){
    error.value = null
    loading.value = true

    try{
      socialLinks.value = await getSocialLinkApi(portfolioId)
    }catch(err){
      error.value = err ? err.message : 'Failed to get social links'
    }
  }

  async function createSocialLink(portfolioId: number, socialLink: CreateSocialLinkType){
    error.value = null

    try{
      return await createSocialLinkApi(portfolioId, socialLink)
    }catch(err){
      error.value = err ? err.message : 'Failed to create social link'
    }
  }

  async function updateSocialLink(portfolioId: number, socialLink: SocialLinkType){
    error.value = null

    try{
      return await updateSocialLinkApi(portfolioId, socialLink.id, socialLink)
    }catch (err){
      error.value = err ? err.message : 'Failed to update social link'
    }
  }

  async function deleteSocialLink(portfolioId: number, linkId: number){
    error.value = null

    try{
      return await deleteSocialLinkApi(portfolioId, linkId)
    }catch (err){
      error.value = err ? err.message : 'Failed to delete social link'
    }
  }

  return {error, loading, socialLinks, getSocialLink, createSocialLink, updateSocialLink, deleteSocialLink}
})
