<script lang="ts" setup>
import NavApp from "@/components/layout/NavApp.vue";
import HeaderComp from "@/components/layout/HeaderComp.vue";
import Background from "@/components/layout/Background.vue";
import Interface from "@/components/ui/Interface.vue";
import MainContent from "@/components/layout/MainContent.vue";
import {useProfileStore} from "@/stores/profileStore.ts";
import {computed, onMounted, ref, watch} from "vue";
import type {ProfileType} from "@/types/profileType.ts";
import type {ChangeProfileType} from "@/types/changeProfileType.ts";
import {updateProfileApi} from "@/api/profile.api.ts";
import profile from "@/pages/Profile.vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const tl = (key: string) => t(`profile.${key}`);


const profileStore = useProfileStore();

const profileData = ref<ProfileType | null>(null);

const firstname = ref<string | null>(null);
const lastname = ref<string | null>( null);
const username = ref<string | null>(null);
const email = ref<string | null>(null);
const bio = ref<string>('')

const name = computed(() => {
  if(profileData.value?.firstName && profileData.value?.lastName)
    return `${profileData.value?.firstName} ${profileData.value?.lastName}`;
  else if(!profileData.value?.lastName && profileData.value?.firstName)
    return profileData.value?.firstName
  else if(!profileData.value?.firstName && profileData.value?.lastName)
    return profileData.value?.lastName
  else
    return profileData.value?.email
})

onMounted(async () => {
  await profileStore.getProfile()
  profileData.value = profileStore.profileData

  setProfileAttributs()

  locale.value = profileStore.profileData?.preferredLanguage ?? 'de'
})

const message = ref<string | null>(null);
const error = ref<string | null>(null);
async function submitProfileChanges(){
  error.value = null
  message.value = null

  const profile : ChangeProfileType = {
    firstname: firstname.value ?? '',
    lastname: lastname.value ?? '',
    username: username.value ?? '',
    email: profileData.value?.email!,
    bio: bio.value ?? '',
  }

  try{
    const res = await profileStore.updateProfile(profile)
    profileData.value = res ? res : profileStore.profileData

    message.value = 'Profildaten erfolgreich geändert.'
  }catch(err){
    error.value = err ? err.message : 'Änderungen fehlgeschlagen.'
  }
}

async function cancelProfileChanges(){
  error.value = null
  message.value = null

  await profileStore.getProfile()
  profileData.value = profileStore.profileData

  setProfileAttributs()

  message.value = tl('Creation-box.buttons.cancel-result')
}

function setProfileAttributs(){
  firstname.value = profileData.value?.firstName ?? ''
  lastname.value = profileData.value?.lastName ?? ''
  username.value = profileData.value?.username ?? ''
  email.value = profileData.value?.email ?? ''
  bio.value = profileData.value?.bio ?? ''
}

watch(bio, (newValue) => {
  if(newValue.length > 220){
    bio.value = bio.value?.slice(0, 220)
  }
})

// profile picture change
async function onProfileImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  try {
    await profileStore.updateProfilePicture(file)
    await profileStore.getProfile()
    profileData.value = profileStore.profileData
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <Background>
    <NavApp></NavApp>

    <HeaderComp :title="tl('Head.Profile')" :tag="tl('Head.Title')" :subtitle="tl('Head.Lead')"></HeaderComp>

    <MainContent class="mb-4">
      <Interface>
        <div class="w-full flex items-center justify-start gap-4">
          <div v-if="profileData?.profileImg === null" class="select-none flex items-center justify-center bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-[var(--text-color-white)] font-bold text-3xl rounded-full w-[100px] h-[100px]">
            {{ name?.slice(0,2).toUpperCase() }}
          </div>
          <img v-else class="select-none flex items-center justify-center rounded-full w-[100px] h-[100px] object-cover" :src="`http://localhost:3000${profileData?.profileImg}`">

          <div class="flex flex-col gap-2">
            <p class="text-nowrap font-semibold">{{ name }}</p>
            <label class="hidden sm:flex w-fit cursor-pointer px-2.5 py-1.5 rounded-lg text-[var(--primary-color)] bg-blue-50 border border-blue-300 text-xs items-center justify-center gap-1">
              <input type="file" accept="image/*" class="hidden" @change="onProfileImageChange"/>
              <div class="flex items-center justify-center text-sm">
                <i class="fa-regular fa-image"></i>
              </div>
              <span>{{ tl('Creation-box.profile-picture') }}</span>
            </label>
          </div>
        </div>

        <div class="w-full h-[1px] bg-gray-200 my-4"></div>

        <div>
          <span class="uppercase text-[var(--text-color-light)] text-sm font-semibold">{{ tl('Creation-box.data-title') }}</span>

          <form class="my-5">

            <div class="flex items-center justify-center gap-2">
              <div class="w-full flex flex-col items-start justify-center gap-1">
                <label for="fname" class="sm-subtitle text-[var(--text-color-light)]">{{ tl('Creation-box.first-name') }}</label>
                <input v-model="firstname" class="outline-none w-full bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="fname" id="fname" autocomplete="off" />
              </div>
              <div class="w-full flex flex-col items-start justify-center gap-1">
                <label for="lname" class="sm-subtitle text-[var(--text-color-light)]">{{ tl('Creation-box.surname') }}</label>
                <input v-model="lastname" class=" outline-none w-full bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="lname" id="lname" autocomplete="off" />
              </div>
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
               <label for="username" class="sm-subtitle text-[var(--text-color-light)]">{{ tl('Creation-box.username') }}</label>
              <input v-model="username" class="outline-none w-full bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="text" name="username" id="username" autocomplete="off" />
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
              <label for="email" class="sm-subtitle text-[var(--text-color-light)]">{{ tl('Creation-box.e-mail') }}</label>
              <input disabled class="cursor-not-allowed outline-none w-full bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm" type="email" name="email" id="email" :placeholder="email ?? '' " autocomplete="off" />
            </div>

            <div class="w-full flex flex-col items-start justify-center gap-1 mt-4">
              <label for="email" class="sm-subtitle text-[var(--text-color-light)]">{{ tl('Creation-box.Description') }}</label>
              <textarea v-model="bio" class="outline-none w-full bg-[var(--background-color)] border border-gray-300 px-4 py-2 rounded-lg text-sm min-h-[150px]" type="email" name="email" id="email" autocomplete="off" />
              <div class="flex w-full items-center justify-end text-xs text-[var(--text-color-light)]">
                <span>{{ bio ? bio.length : 0 }} / 220 Zeichen</span>
              </div>
            </div>
          </form>

          <div class="w-full flex flex-col-reverse items-start justify-between pt-8 border border-t-gray-200 border-transparent">
            <div class="mt-3">
              <span v-if="message" class="text-sm text-green-500">{{ message }}</span>
              <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
            </div>
            <div class="w-full flex flex-col-reverse sm:flex-row items-center justify-end gap-2 text-nowrap">
              <button @click="cancelProfileChanges()" class="w-full hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 px-6 py-4 sm:px-4 sm:py-2 rounded-lg border border-gray-200 font-semibold bg-transparent text-[var(--text-color-light)]">{{ tl('Creation-box.buttons.cancel-button') }}</button>
              <button @click="submitProfileChanges()" class="w-full hover:bg-transparent hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 px-6 py-4 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-[var(--text-color-white)] bg-[var(--primary-color)]">{{ tl('Creation-box.buttons.change-button') }}</button>
            </div>
          </div>
        </div>
      </Interface>
    </MainContent>
  </Background>
</template>
