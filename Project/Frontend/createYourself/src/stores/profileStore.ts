import {defineStore} from "pinia";
import {ref} from "vue";
import {
  deleteAccountApi,
  getProfileApi,
  updateLanguageApi, updatePasswordApi,
  updateProfileApi,
  updateProfilePictureApi
} from "@/api/profile.api.ts";
import type {ProfileType} from "@/types/profileType.ts";
import type {ChangeProfileType} from "@/types/changeProfileType.ts";
import type {LanguageType} from "@/types/languageType.ts";
import type {PasswordChange} from "@/types/passwordChange.ts";

export const useProfileStore = defineStore('profile', () =>{
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const profileData = ref<ProfileType | null>(null)
  const profilePicture = ref<any | null>(null)
  const prefLanguage = ref<LanguageType | null>(null)

  async function getProfile(){
    loading.value = true
    error.value = null
    try{
      profileData.value = await getProfileApi()
      loading.value = false
    }catch(error: any){
      error.value = error ? error.message : 'Failed to load profile.'
    }
  }

  async function updateProfile(profile: ChangeProfileType) : Promise<ProfileType | undefined> {
    error.value = null

    try{
      const data = await updateProfileApi(profile)
      profileData.value = data
      return data
    }catch(error: any){
      error.value = error ? error.message : 'Failed to update profile.'
      throw error
    }
  }

  async function updateProfilePicture(){
    error.value = null

    try{
      profilePicture.value = await updateProfilePictureApi()
    }catch(error: any){
      error.value = error ? error.message : 'Failed to update profile picture.'
    }
  }

  async function updateLanguage(language: string) {
    error.value = null

    try{
      prefLanguage.value = await updateLanguageApi(language)
    }catch(error: any){
      error.value = error ? error.message : 'Failed to update language.'
      throw error
    }
  }

  async function updatePassword(password: PasswordChange){
    error.value = null

    try{
      await updatePasswordApi(password)
    }catch(error: any){
      error.value = error ? error.message : 'Failed to update password.'
      throw error
    }
  }

  async function deleteProfile(){
    error.value = null

    try{
      await deleteAccountApi()
    }catch (error: any){
      error.value = error ? error.message : 'Failed to delete account.'
      throw error
    }
  }

  return {getProfile, updateProfilePicture,updateProfile, updateLanguage, updatePassword, deleteProfile, error, profileData, loading, profilePicture, prefLanguage}
})
