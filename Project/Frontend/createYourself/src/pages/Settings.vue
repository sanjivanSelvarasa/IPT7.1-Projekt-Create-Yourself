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

    <HeaderComp title="Einstellungen" tag="Verwaltung" subtitle="Verwalte dein Konto, deine Sprache und Sicherheitseinstellungen"></HeaderComp>

    <MainContent>
      <Interface>
        <div class="flex items-center justify-start gap-3">
          <div class="flex justify-center items-center w-[35px] h-[35px] bg-blue-50 text-[var(--primary-color)] rounded-lg">
            <i class="fa-solid fa-language"></i>
          </div>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold">Sprache</span>
            <span class="text-[var(--text-color-light)] text-sm">Wähle deine bevorzugte Anzeigesprache</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col items-start justify-center gap-3">
          <label class="font-medium text-sm" for="language">Anzeigesprache</label>
          <select v-model="prefLang" class="cursor-pointer outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" name="language" id="language">
            <option value="de" class="cursor-pointer">Deutsch</option>
            <option value="en" class="cursor-pointer">Englisch</option>
            <option value="fr" class="cursor-pointer">Französisch</option>
          </select>

          <div class="w-full flex items-center justify-between">
            <div>
              <span class="text-sm text-red-500">{{ errorLang }}</span>
              <span class="text-sm text-green-500">{{ messageLanguage }}</span>
            </div>
            <button @click="submitLang()" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg border border-transparent">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-check"></i>
              </div>
              <span>Sprache speichern</span>
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
            <span class="font-semibold">Sicherheit</span>
            <span class="text-[var(--text-color-light)] text-sm">Passwort und Kontosicherheit verwalten</span>
          </div>
        </div>

        <div class="divider"></div>

        <form @submit.prevent="submitPassword()" class="flex flex-col items-start justify-center gap-7">
          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="currPassword">Passwort</label>
            <input v-model="currPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="currPassword" id="currPassword" placeholder="••••••••" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPassword">Neues Passwort</label>
            <input v-model="newPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPassword" id="newPassword" placeholder="mind. 8 Zeichen" />
          </div>

          <div class="flex flex-col items-start justify-center gap-1 w-full">
            <label class="font-medium text-sm" for="newPasswordConfirm">Neues Passwort bestätigen</label>
            <input v-model="confirmPassword" class="outline-none w-full bg-[var(--background-color)] rounded-lg px-4 py-2 border border-gray-200" type="password" name="newPasswordConfirm" id="newPasswordConfirm" placeholder="Passwort wiederholen" />
          </div>

          <div class="w-full flex items-center justify-between">
            <div>
              <span v-if="messagePassword" class="text-sm text-green-500">{{ messagePassword }}</span>
              <span v-if="errorPassword" class="text-sm text-red-500">{{ errorPassword }}</span>
            </div>
            <button class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg border border-transparent">
              <div class="flex items-center justify-center">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span>Passwort ändern</span>
            </button>
          </div>
        </form>
     </Interface>

      <Interface class="bg-red-50! border-red-500 mb-5 border-2!">
        <div class="flex items-center justify-start gap-3">
          <SvgStruct class="w-[35px] h-[35px] bg-red-100 text-red-500 rounded-lg border-2 border-red-500 text-xl">
            <i class="fa-solid fa-exclamation"></i>
          </SvgStruct>
          <div class="flex flex-col gap-1 justify-center items-start">
            <span class="font-semibold text-red-500">Gefahrenbereich</span>
            <span class="text-red-500 text-sm">Irreversible Aktionen - mit Vorsicht bedienen!</span>
          </div>
        </div>

        <div class="divider bg-red-200!"></div>

        <div class="flex items-center justify-between">
          <div>
            <span class="text-red-500 font-semibold">Account löschen</span>
            <p class="text-sm text-red-400 max-w-[400px]">Alle Daten, Fortschritte und Einstellungen werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.</p>
          </div>
          <button @click="deleteAccount()" class="flex items-center justify-center gap-1 text-red-500 font-semibold rounded-lg px-4 py-2 border-2 border-red-500 hover:bg-red-500 hover:text-[var(--surface-color)] transition duration-75">
            <SvgStruct>
              <i class="fa-solid fa-trash-can"></i>
            </SvgStruct>
            <span class="text-nowrap">Account löschen</span>
          </button>
        </div>
      </Interface>
    </MainContent>
  </Background>
</template>
