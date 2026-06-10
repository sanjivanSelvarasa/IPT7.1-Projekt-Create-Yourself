import {apiFetch} from "@/api/api.ts";
import type {ChangeProfileType} from "@/types/changeProfileType.ts";
import type {PasswordChangeType} from "@/types/passwordChangeType.ts";
import type {ProfileType} from "@/types/profileType.ts";
import type {LanguageType} from "@/types/languageType.ts";

export async function getProfileApi() : Promise<ProfileType> {
  return await apiFetch('/account/profile', {
    method: 'GET',
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function updateProfileApi(profile: ChangeProfileType) : Promise<ProfileType>{
  return await apiFetch('/account/profile', {
    method: 'PUT',
    body: JSON.stringify({
      first_name: profile.firstname,
      last_name: profile.lastname,
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
    }),
    headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function updateProfilePictureApi(image: File) {
  const formData = new FormData()
  formData.append("image", image)

  return await apiFetch("/account/profile/picture", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
}

export async function updateLanguageApi(language: string) : Promise<LanguageType>{
  return await apiFetch('/account/language', {
    method: 'PUT',
    body: JSON.stringify({
      language_code: language,
    }),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function updatePasswordApi(password: PasswordChangeType){
  return await apiFetch('/account/password', {
    method: 'PUT',
    body: JSON.stringify({
      current_password: password.currentPassword,
      new_password: password.newPassword,
      confirm_password: password.confirmPassword,
    }),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}

export async function deleteAccountApi(){
  return await apiFetch('/account', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
}
