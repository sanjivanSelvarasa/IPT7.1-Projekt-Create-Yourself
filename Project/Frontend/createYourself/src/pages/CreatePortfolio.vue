<script lang="ts" setup>

import NavApp from "@/components/layout/NavApp.vue";
import Background from "@/components/layout/Background.vue";
import HeaderComp from "@/components/layout/HeaderComp.vue";
import Interface from "@/components/ui/Interface.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import MainContent from "@/components/layout/MainContent.vue";
import InputApp from "@/components/ui/InputApp.vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";
import {ref, watch} from "vue";
import type {CreatePortfolioType} from "@/types/createPortfolioType.ts";
import {useRouter} from "vue-router";
import {toSlug} from "@/utils/slug.ts";

const portfolioStore = usePortfolioStore()

const title = ref<string>('');
const description = ref<string>('');
const lang = ref<string>('de');
const visibility = ref<string>('private');
const slug = ref<string>('');

const isSlugAvailable = ref<boolean>(true);

watch(slug, async (newVal) => {
  const checkSlug = toSlug(newVal);
  slug.value = checkSlug;

  if(checkSlug.length === 0) return;

  const res = await portfolioStore.slugAvailable(checkSlug)
  isSlugAvailable.value = res?.available ?? false;
})

const router = useRouter();

const error = ref<string>('');
async function createPortfolioFunction() {
  const portfolio : CreatePortfolioType = {
    title: title.value,
    description: description.value,
    visibility: visibility.value,
    slug: slug.value,
    languageCode: lang.value,
  }

  if(title.value === ''){
    error.value = 'Titel ist obligatorisch';
    return;
  }

  if(lang.value === ''){
    error.value = 'Sprache ist obligatorisch';
    return;
  }

  if(visibility.value === ''){
    error.value = 'Sichtbarkeit ist obligatorisch';
    return;
  }

  if(slug.value === ''){
    error.value = 'Link ist obligatorisch';
    return;
  }

  try{
    await portfolioStore.createPortfolio(portfolio);

    if(portfolioStore.error) {
      error.value = portfolioStore.error;
      return
    }

    await router.push("/editor");
  }catch(e){
    error.value = portfolioStore.error ? portfolioStore.error : e;
  }
}
</script>

<template>
  <Background>
    <NavApp></NavApp>

    <HeaderComp title="Neues Portfolio erstellen" tag="Erschaffen" subtitle="Lege zunächst die Grundinformationen fest. Du kannst Projekte, Skills und weitere Inhalte im Editor festlegen / hinzufügen und jederzeit ändern."></HeaderComp>

    <MainContent class="mb-5">
      <Interface class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)] text-sm">
            <SvgStruct>
              <i class="fa-regular fa-paper-plane"></i>
            </SvgStruct>
            <span class="sm-subtitle">Schritt 1</span>
          </div>

          <h2>Grundinformationen</h2>

          <span class="text-[var(--text-color-light)]">Diese Angaben werden auf deimem Portfolio sichtbar sein.</span>
        </div>

        <div class="flex flex-col gap-6 mt-3">
          <InputApp name="Portfolio-Titel *" for="title">
            <input v-model="title" class="default-input w-full" name="title" placeholder="Mein Portfolio">
          </InputApp>

          <InputApp name="Kurzbeschreibung" for="description">
            <textarea v-model="description" class="default-input w-full min-h-[100px] outline-none" name="description" placeholder="Eine kurze Beschreibung über dein Portfolio."></textarea>
            <span class="text-[var(--text-color-light)] text-sm">{{ description.length }} / 180 Zeichen</span>
          </InputApp>

          <InputApp name="Portfolio-Link *" for="link">
            <div class="relative default-input p-0! overflow-hidden flex items-center justify-start w-full">
              <div class="px-3 py-2 w-fit h-full bg-[var(--background-color)] text-[var(--text-color-light)] border border-transparent border-r-gray-200">
                <span>createyourself/</span>
              </div>
              <input v-model="slug" class="default-input w-full border-none!" name="link" placeholder="max-mustermann">

              <div v-if="isSlugAvailable && slug.length > 0" class="flex items-center justify-center gap-2 text-sm text-green-500 font-semibold absolute top-[50%] right-0 -translate-y-[50%] mr-2">
                <SvgStruct>
                  <i class="fa-solid fa-check"></i>
                </SvgStruct>
                <span>Verfügbar</span>
              </div>

              <div v-if="!isSlugAvailable && slug.length > 0" class="flex items-center justify-center gap-2 text-sm text-red-500 font-semibold absolute top-[50%] right-0 -translate-y-[50%] mr-2">
                <SvgStruct>
                  <i class="fa-solid fa-x"></i>
                </SvgStruct>
                <span>Vergeben</span>
              </div>
            </div>
          </InputApp>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col gap-6 mt-3">
          <div class="flex flex-col gap-1">
            <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)] text-sm">
              <SvgStruct>
                <i class="fa-solid fa-gear"></i>
              </SvgStruct>
              <span class="sm-subtitle">Schritt 2</span>
            </div>

            <h2>Sichtbarkeit & Sprache</h2>

            <span class="text-[var(--text-color-light)]">Bestimme, wer dein Portfolio sehen kann und in welcher Sprache es erscheint.</span>
          </div>

          <div class="flex items-center justify-between">
            <InputApp name="Sichtbarkeit" for="visibility">
              <div class="flex items-center justify-center gap-2 bg-[var(--background-color)] rounded-lg px-1 py-1">
                <button @click="visibility = 'private' " :class="visibility === 'private' ? 'visibility-active' : '' " class="hover:bg-gray-100 transition duration-75 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-transparent">
                  <SvgStruct>
                    <i class="fa-solid fa-lock"></i>
                  </SvgStruct>
                  <span>Privat</span>
                </button>
                <button @click="visibility = 'public' " :class="visibility === 'public' ? 'visibility-active' : '' " class="hover:bg-gray-100 transition duration-75 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-transparent ">
                  <SvgStruct>
                    <i class="fa-solid fa-globe"></i>
                  </SvgStruct>
                  <span>Öffentlich</span>
                </button>
              </div>
            </InputApp>

            <InputApp name="Hauptsprache" for="language">
              <div class="flex items-center justify-center gap-2 bg-[var(--background-color)] rounded-lg px-1 py-1">
                <button @click="lang = 'de' " :class="lang === 'de' ? 'lang-active' : '' " class="hover:bg-gray-100 transition duration-75 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-transparent">
                  <span class="transition duration-75 text-xs font-semibold text-[var(--text-color-light)] px-1 py-0.5 rounded-sm bg-gray-200">
                    DE
                  </span>
                  <span>Deutsch</span>
                </button>
                <button @click="lang = 'en' " :class="lang === 'en' ? 'lang-active' : '' " class="hover:bg-gray-100 transition duration-75 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-transparent">
                  <span class="transition duration-75 text-xs font-semibold text-[var(--text-color-light)] px-1 py-0.5 rounded-sm bg-gray-200">
                    EN
                  </span>
                  <span>Englisch</span>
                </button>
                <button @click="lang = 'fr' " :class="lang === 'fr' ? 'lang-active' : '' " class="hover:bg-gray-100 transition duration-75 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-transparent">
                  <span class="transition duration-75 text-xs font-semibold text-[var(--text-color-light)] px-1 py-0.5 rounded-sm bg-gray-200">
                    FR
                  </span>
                  <span>Französisch</span>
                </button>
              </div>
            </InputApp>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col gap-6 mt-3">
          <div class="flex flex-col gap-1">
            <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)] text-sm">
              <SvgStruct>
                <i class="fa-solid fa-palette"></i>
              </SvgStruct>
              <span class="sm-subtitle">Schritt 3</span>
            </div>

            <h2>Template auswählen</h2>

            <span class="text-[var(--text-color-light)]">Wähle eine Vorlage als Ausganspunkt. Du kannst das Design jederzeit anpassen.</span>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <button class="overflow-hidden hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:-translate-y-1 transition-all ease-in-out duration-150 bg-transparent border-2 border-gray-200 rounded-2xl">
              <div class="h-[200px] w-full">
                  <svg viewBox="0 0 200 124" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="124" fill="#FFFFFF"/>
                    <!-- subtle top line -->
                    <line x1="20" y1="18" x2="40" y2="18" stroke="#0F172A" stroke-width="1.2"/>
                    <!-- main heading -->
                    <rect x="20" y="38" width="92" height="6" rx="1" fill="#0F172A"/>
                    <!-- subtitle -->
                    <rect x="20" y="52" width="60" height="3" rx="1" fill="#94A3B8"/>
                    <!-- content lines -->
                    <rect x="20" y="74" width="160" height="2" rx="1" fill="#E2E8F0"/>
                    <rect x="20" y="82" width="140" height="2" rx="1" fill="#E2E8F0"/>
                    <rect x="20" y="90" width="120" height="2" rx="1" fill="#E2E8F0"/>
                    <rect x="20" y="104" width="32" height="2" rx="1" fill="#0F172A"/>
                  </svg>
              </div>
              <div class="flex flex-col items-start justify-center gap-1 w-full px-4 py-3 border border-transparent border-t-gray-200 mt-1">
                <span class="font-semibold">Minimal</span>
                <span class="text-sm">Reduziert, fokussiert auf Inhalt</span>
              </div>
            </button>

            <button class="overflow-hidden hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:-translate-y-1 transition-all ease-in-out duration-150 bg-transparent border-2 border-gray-200 rounded-2xl">
              <div class="h-[200px]">
                  <svg viewBox="0 0 200 124" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="124" fill="#FFFFFF"/>
                    <!-- big organic shape -->
                    <circle cx="160" cy="-10" r="60" fill="#7C3AED" opacity="0.18"/>
                    <circle cx="170" cy="20" r="22" fill="#7C3AED"/>
                    <!-- accent dot -->
                    <circle cx="32" cy="92" r="14" fill="#22C55E"/>
                    <!-- name block -->
                    <rect x="16" y="38" width="78" height="7" rx="1.5" fill="#0F172A"/>
                    <rect x="16" y="50" width="50" height="3" rx="1" fill="#94A3B8"/>
                    <!-- offset card -->
                    <rect x="60" y="72" width="120" height="32" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
                    <rect x="68" y="80" width="48" height="3" rx="1" fill="#0F172A"/>
                    <rect x="68" y="89" width="80" height="2" rx="1" fill="#CBD5E1"/>
                    <rect x="68" y="95" width="64" height="2" rx="1" fill="#CBD5E1"/>
                  </svg>
              </div>
              <div class="flex flex-col items-start justify-center gap-1 w-full px-4 py-3 border border-transparent border-t-gray-200 mt-1">
                <span class="font-semibold">Kreativ</span>
                <span class="text-sm">Ausdrucksstark mit visuellen Akzenten</span>
              </div>
            </button>

            <button class="overflow-hidden hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:-translate-y-1 transition-all ease-in-out duration-150 bg-transparent border-2 border-gray-200 rounded-2xl">
              <div class="h-[200px]">
                <svg viewBox="0 0 200 124" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="124" fill="#FFFFFF"/>
                  <!-- header band -->
                  <rect x="0" y="0" width="200" height="42" fill="#0F172A"/>
                  <!-- avatar -->
                  <circle cx="22" cy="21" r="9" fill="#2563EB"/>
                  <!-- header text -->
                  <rect x="38" y="14" width="58" height="5" rx="1" fill="#FFFFFF"/>
                  <rect x="38" y="23" width="36" height="3" rx="1" fill="#64748B"/>
                  <!-- nav dots -->
                  <rect x="148" y="18" width="14" height="2" rx="1" fill="#CBD5E1"/>
                  <rect x="166" y="18" width="14" height="2" rx="1" fill="#CBD5E1"/>
                  <!-- project grid -->
                  <rect x="16" y="56" width="52" height="50" rx="3" fill="#F8FAFC" stroke="#E2E8F0"/>
                  <rect x="20" y="60" width="44" height="24" rx="2" fill="#E2E8F0"/>
                  <rect x="20" y="88" width="32" height="3" rx="1" fill="#0F172A"/>
                  <rect x="20" y="95" width="24" height="2" rx="1" fill="#94A3B8"/>

                  <rect x="74" y="56" width="52" height="50" rx="3" fill="#F8FAFC" stroke="#E2E8F0"/>
                  <rect x="78" y="60" width="44" height="24" rx="2" fill="#E2E8F0"/>
                  <rect x="78" y="88" width="36" height="3" rx="1" fill="#0F172A"/>
                  <rect x="78" y="95" width="26" height="2" rx="1" fill="#94A3B8"/>

                  <rect x="132" y="56" width="52" height="50" rx="3" fill="#F8FAFC" stroke="#E2E8F0"/>
                  <rect x="136" y="60" width="44" height="24" rx="2" fill="#E2E8F0"/>
                  <rect x="136" y="88" width="30" height="3" rx="1" fill="#0F172A"/>
                  <rect x="136" y="95" width="22" height="2" rx="1" fill="#94A3B8"/>
                </svg>
              </div>
              <div class="flex flex-col items-start justify-center gap-1 w-full px-4 py-3 border border-transparent border-t-gray-200 mt-1">
                <span class="font-semibold">Professionell</span>
                <span class="text-sm">Strukturiert für Projekte und Erfahrung</span>
              </div>
            </button>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex items-center justify-between">
          <SvgStruct class="info relative text-xl cursor-pointer">
            <i class="fa-regular fa-circle-question"></i>
            <span class="hidden absolute top-0 left-7 text-sm px-3 w-[350px] py-2 bg-[var(--background-color)] border border-gray-200 rounded-lg">Jegliche Einstellungen kannst du jederzeit nachträglich anpassen.</span>
          </SvgStruct>
          <div class="flex gap-2">
            <RouterLink to="/dashboard" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 px-4 py-3 bg-[var(--surface-color)] font-semibold border border-gray-200 rounded-lg">Abbrechen</RouterLink>
            <button @click="createPortfolioFunction()" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 px-4 py-3 bg-[var(--primary-color)] text-[var(--text-color-white)] font-semibold border border-gray-200 rounded-lg flex gap-1">
              <span>Portfolio erstellen</span>
              <SvgStruct>
                <i class="fa-solid fa-angle-right"></i>
              </SvgStruct>
            </button>
          </div>
        </div>

        <div class="text-red-500 text-sm">
          <span>{{ error }}</span>
        </div>
      </Interface>
    </MainContent>
  </Background>
</template>

<style scoped>
  .visibility-active{
    border: 1px solid var(--color-gray-200);
    background-color: var(--surface-color);
  }

  .lang-active{
    border: 1px solid var(--color-gray-200);
    background-color: var(--surface-color);
  }

  .lang-active span:nth-child(1) {
    background-color: var(--primary-color);
    color: var(--text-color-white);
  }

  .info:hover span {
    display: block;
  }
</style>
