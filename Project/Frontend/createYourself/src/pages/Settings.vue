<script lang="ts" setup>
import NavApp from "@/components/layout/NavApp.vue";
import HeaderComp from "@/components/layout/HeaderComp.vue";
import Background from "@/components/layout/Background.vue";
import Interface from "@/components/ui/Interface.vue";
import MainContent from "@/components/layout/MainContent.vue";
import {useProfileStore} from "@/stores/profileStore.ts";
import {onMounted, ref} from "vue";
import type {PasswordChangeType} from "@/types/passwordChangeType.ts";
import {useRouter} from "vue-router";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const tl = (key: string) => t(`settings.${key}`);

const profileStore = useProfileStore();

async function updateLang(lang: string) {
  await profileStore.updateLanguage(lang);
}

const prefLang = ref<string>('de');
const errorLang = ref<string | null>(null);
const messageLanguage = ref<string | null>(null);
onMounted(async () => {
  await profileStore.getProfile()
  prefLang.value = profileStore.profileData?.preferredLanguage ?? 'de'
})

async function submitLang() {
  messageLanguage.value = null
  if(!prefLang.value) errorLang.value = 'Sprache konnte nicht gesetzt werden.'
  await profileStore.updateLanguage(prefLang.value);
  messageLanguage.value = 'Sprache erfolgreich gesetzt.';
}

const currPassword = ref<string>('');
const newPassword = ref<string>('');
const confirmPassword = ref<string>('');

const errorPassword = ref<string | null>(null);
const messagePassword = ref<string | null>(null);
async function submitPassword() {
  errorPassword.value = null
  messagePassword.value = null

  const password : PasswordChangeType = {
    currentPassword: currPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  }
  try{
    await profileStore.updatePassword(password)
    messagePassword.value = 'Passwort wurde aktualisiert.'
  }catch(error){
    errorPassword.value = error ? error.message : 'Passwort ändern fehlgeschlagen'
  }
}

const router = useRouter();
async function deleteAccount() {
  try{
    await profileStore.deleteProfile()
    await router.push("/login")
  }catch{
  }
}

</script>

<template>
  <Background>
    <NavApp></NavApp>

    <HeaderComp :title="tl('Head.Settings')" :tag="tl('Head.Title')" :subtitle="tl('Head.Lead')"></HeaderComp>

    <MainContent>
      <Interface>
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-blue-50 text-[var(--primary-color)] rounded-lg">
            <i class="fa-solid fa-language"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold">{{ tl('Language.Title') }}</span>
            <span class="text-[var(--text-color-light)] text-sm">{{ tl('Language.under-title') }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col items-start justify-center gap-3">
          <label class="font-medium text-sm" for="language">{{ tl('Language.sort-title') }}</label>
          <select v-model="prefLang" class="cursor-pointer outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" name="language" id="language">
            <option value="de" class="cursor-pointer">{{ tl('Language.sort.de') }}</option>
            <option value="en" class="cursor-pointer">{{ tl('Language.sort.en') }}</option>
            <option value="fr" class="cursor-pointer">{{ tl('Language.sort.fr') }}</option>
          </select>

          <div class="w-full flex-col-reverse sm:flex-row flex items-center justify-between">
            <div class="mt-3 sm:mt-0">
              <span class="text-sm text-red-500">{{ errorLang }}</span>
              <span class="text-sm text-green-500">{{ messageLanguage }}</span>
            </div>
            <button @click="submitLang()" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 mt-4 w-full sm:w-fit flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg border border-transparent">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span>{{ tl('Language.safe') }}</span>
            </button>
          </div>
        </div>
      </Interface>

     <Interface>
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-blue-50 text-[var(--primary-color)] rounded-lg">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold">{{ tl('Safety-Segment.Title') }}</span>
            <span class="text-[var(--text-color-light)] text-sm">{{ tl('Safety-Segment.under-title') }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <form @submit.prevent="submitPassword()" class="flex flex-col items-start justify-center gap-7">
          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="currPassword">{{ tl('Safety-Segment.change-password.first-title') }}</label>
            <input v-model="currPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="currPassword" id="currPassword" placeholder="••••••••" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPassword">{{ tl('Safety-Segment.change-password.second-title') }}</label>
            <input v-model="newPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPassword" id="newPassword" :placeholder="tl('Safety-Segment.change-password.second-box')" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPasswordConfirm">{{ tl('Safety-Segment.change-password.third-title') }}</label>
            <input v-model="confirmPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPasswordConfirm" id="newPasswordConfirm" :placeholder="tl('Safety-Segment.change-password.third-box')" />
          </div>

          <div class="w-full flex-col-reverse sm:flex-row flex items-center justify-between">
            <div class="mt-3 sm:mt-0">
              <span v-if="messagePassword" class="text-sm text-green-500">{{ messagePassword }}</span>
              <span v-if="errorPassword" class="text-sm text-red-500">{{ errorPassword }}</span>
            </div>
            <button class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 w-full sm:w-fit flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg border border-transparent">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span>{{ tl('Safety-Segment.button') }}</span>
            </button>
          </div>
        </form>
     </Interface>

      <Interface class="bg-red-50! border-red-500 mb-5 border-2!">
        <div class="flex items-center justify-start gap-3">
          <SvgStruct class="min-w-[35px] min-h-[35px] bg-red-100 text-red-500 rounded-lg border-2 border-red-500 text-xl">
            <i class="fa-solid fa-exclamation"></i>
          </SvgStruct>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold text-red-500">{{ tl('Dangerzone.Title') }}</span>
            <span class="text-red-500 text-sm">{{ tl('Dangerzone.under-title') }}</span>
          </div>
        </div>

        <div class="divider bg-red-200!"></div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span class="text-red-500 font-semibold">{{ tl('Dangerzone.Account.title') }}</span>
            <p class="text-sm text-red-400 max-w-[400px]">{{ tl('Dangerzone.Account.text') }}</p>
          </div>
          <button @click="deleteAccount()" class="w-full sm:w-fit flex items-center justify-center gap-1 text-red-500 font-semibold rounded-lg px-4 py-2 border-2 border-red-500 hover:bg-red-500 hover:text-[var(--surface-color)] transition duration-75">
            <SvgStruct>
              <i class="fa-solid fa-trash-can"></i>
            </SvgStruct>
            <span class="text-nowrap">{{ tl('Dangerzone.Account.button') }}</span>
          </button>
        </div>
      </Interface>
    </MainContent>
  </Background>
</template>
