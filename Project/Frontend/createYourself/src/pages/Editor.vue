<script lang="ts" setup>
import Logo from "@/components/ui/Logo.vue";
import Block from "@/components/ui/editor/Block.vue";
import Sections from "@/components/ui/editor/Sections.vue";
import ScreenButton from "@/components/ui/editor/ScreenButton.vue";
import Content from "@/components/ui/editor/Content.vue";
import SectionStruct from "@/components/ui/editor/SectionStruct.vue";
import {computed, onMounted, ref} from "vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";
import type {PortfolioType} from "@/types/portfolioType.ts";
import {useRoute} from "vue-router";
import {getDateGap} from "@/utils/date.ts";
import AddSection from "@/components/ui/editor/AddSection.vue";
import type {CreateSectionType} from "@/types/createSectionType.ts";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import {usePortfolioSectionStore} from "@/stores/portfolioSectionStore.ts";
import {createSkillApi, deleteSkillApi, getSkillsApi, updateSkillApi} from "@/api/skill.api.ts";
import type {CreateSkillType} from "@/types/createSkillType.ts";
import {
  createSocialLinkApi,
  deleteSocialLinkApi,
  getSocialLinkApi,
  updateSocialLinkApi
} from "@/api/socialLink.api.ts";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import type {CreateSocialLinkType} from "@/types/createSocialLinkType.ts";
import {
  createExperienceApi,
  deleteExperienceApi,
  getExperienceApi,
  updateExperienceApi
} from "@/api/experience.api.ts";
import type {CreateExperienceType} from "@/types/createExperienceType.ts";
import {
  createEducationApi,
  deleteEducationApi,
  getEducationApi,
  updateEducationApi
} from "@/api/education.api.ts";
import type {CreateEducationType} from "@/types/createEducationType.ts";
import {
  createEditorBlockApi,
  deleteEditorBlockApi,
  getEditorBlockApi,
  updateEditorBlockApi
} from "@/api/editor.api.ts";
import type {CreateEditorBlockType} from "@/types/createEditorBlockType.ts";

const portfolioName = ref<string>('');

const portfolioStore = usePortfolioStore()
const route = useRoute();
const portfolioId = Number(route.params.id)
const portfolio = ref<any | null>(null);
const portfolioFacts = ref<PortfolioType | null>(null);

const portfolioSectionStore = usePortfolioSectionStore();

const sortedSections = computed(() => {
  return [...portfolioSectionStore.sections].sort((a, b) => a.sortOrder - b.sortOrder)
})

onMounted(async () => {
  portfolio.value = await portfolioStore.getFullPortfolioById(portfolioId) ?? null

  portfolioFacts.value = {
    id: portfolio.value.portfolio.id,
    currentThemeId: portfolio.value.portfolio.currentThemeId,
    currentVersionId: portfolio.value.portfolio.currentVersionId,
    languageCode: portfolio.value.portfolio.languageCode,
    userId: portfolio.value.portfolio.userId,
    templateId: portfolio.value.portfolio.templateId,
    title: portfolio.value.portfolio.title,
    description: portfolio.value.portfolio.description,
    slug: portfolio.value.portfolio.slug,
    visibility: portfolio.value.portfolio.visibility,
    createdAt: new Date(portfolio.value.portfolio.createdAt),
    updatedAt: new Date(portfolio.value.portfolio.updatedAt),
  }

  portfolioName.value = portfolioFacts.value?.title ?? ''

  await portfolioSectionStore.getSections(portfolioFacts.value.id, portfolioFacts.value.currentVersionId)
})

const addSectionVisible = ref<boolean>(false);
const error = ref<string | null>(null);
async function submitSection(sectionHeader: string) {
  if(portfolioFacts.value === null) return;

  error.value = null

  const section : CreateSectionType = {
    sectionType: sectionHeader,
    title: 'PLATZHALTER TITEL',
    sortOrder: Math.max(...portfolioSectionStore.sections?.map(section => section.sortOrder) ?? []) + 1,
    isVisible: true,
  }

  try{
    await portfolioSectionStore.createSection(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, section)
    await portfolioSectionStore.getSections(portfolioId, portfolioFacts.value.currentVersionId)
    addSectionVisible.value = false
  }catch(err: any){
    error.value = err ? err.message : 'Failed to create section.';
  }
}

function getSvgToSectionType(type: string) : string{
  if(type === "Hero Section") return "fa-regular fa-user";
  if(type === "Projekte") return "fa-solid fa-diagram-project";
  if(type === "Skills") return "fa-solid fa-chart-line";
  if(type === "Erfahrung") return "fa-solid fa-briefcase";
  if(type === "Ausbildung") return "fa-solid fa-graduation-cap";
  if(type === "Kontakt & Social") return "fa-regular fa-envelope";
  if(type === "Freie Section") return "fa-solid fa-circle-info";
  else
    return "fa-solid fa-header";
}

async function deleteSection(sectionId: number){
  error.value = null
  try{
    if(portfolioFacts.value === null) return;
    await portfolioSectionStore.deleteSection(portfolioFacts.value.id, portfolioFacts.value.currentVersionId, sectionId);
    await portfolioSectionStore.getSections(portfolioId, portfolioFacts.value.currentVersionId)
  }catch(err){
    error.value = err ? err.message : portfolioSectionStore.error;
  }
}

const sectionSelected = ref<number | null>(null);
function sectionSelectedFunction(sectionId: number){
  sectionSelected.value = sectionId
}
</script>

<template>
  <div v-if="addSectionVisible">
    <AddSection @submit="submitSection" @cancel="addSectionVisible = !addSectionVisible" :error="error ?? '' "></AddSection>
  </div>

  <div class="flex flex-col bg-[var(--background-color)] w-full h-[100vh] overflow-y-hidden">
    <nav class="z-999 px-3 py-2 flex items-center justify-between w-full h-fit bg-[var(--surface-color)] border border-b-gray-200 border-transparent">
      <logo link="/dashboard"></logo>

      <div class="flex items-center justify-center w-full max-w-[1200px]">
        <div class="flex items-center justify-between gap-3 w-full mx-5">
          <div class="flex items-center justify-center gap-5">
            <input v-model="portfolioName" type="text" class="font-semibold px-3 py-2 ">

            <div class="flex items-center justify-center gap-2 bg-green-50 px-3 py-0.5 rounded-full text-sm text-green-700">
              <div class="relative w-[7px] h-[7px]">
                <div class="w-full h-full bg-green-500 rounded-full"></div>
                <div class="absolute w-full h-full bg-green-300 rounded-full animate-ping -translate-y-[7px]"></div>
              </div>
              <span>Gespeichert - {{ portfolioFacts?.updatedAt ? getDateGap(portfolioFacts?.updatedAt) : 'FEHLER' }}</span>
            </div>
          </div>

          <div class="flex items-center justify-center gap-3">
          <div class="flex items-center justify-center gap-5 text-[var(--text-color-light)] text-xl">
            <button class="flex items-center justify-center hover:text-gray-500">
              <i class="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button class="flex items-center justify-center hover:text-gray-500">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
            <div class="w-[1px] h-[30px] bg-gray-200"></div>
          </div>

        </div>
      </div>

      <div class="flex justify-center items-center gap-2">
        <div class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-regular fa-eye"></i>
          </div>
          <span>Vorschau</span>
        </div>

        <div class="hover:bg-transparent hover:text-[var(--text-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border bg-[var(--text-color)] text-[var(--text-color-white)] rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-regular fa-floppy-disk"></i>
          </div>
          <span>Speichern</span>
        </div>

        <div class="hover:bg-transparent hover:text-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border bg-[var(--primary-color)] text-[var(--text-color-white)] rounded-lg select-none cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
          <span>Veröffentlichen</span>
        </div>
      </div>
    </nav>

    <div class="flex justify-between items-start gap-2 flex-1 min-h-0 overflow-hidden">
      <aside class="py-4 px-4 max-w-[300px] w-full min-w-[300px] shrink-0 h-full bg-[var(--surface-color)] overflow-y-auto">
        <div class="flex flex-col justify-center items-start gap-1">
          <span class="sm-subtitle">Baukasten</span>
          <span class="text-sm text-[var(--text-color-light)]">Ziehe Blöcke auf den Editor oder klicke zum Einfügen</span>
        </div>

        <div class="divider"></div>

        <div>
          <span class="sm-subtitle">Blöcke</span>

          <div class="grid grid-cols-2 my-5 gap-3">
            <Block title="Text" svg="fa-solid fa-align-left" subtitle="Absatz / Überschrift"></Block>
            <Block title="Bild" svg="fa-regular fa-image" subtitle="Foto Hochladen"></Block>
            <Block title="Projekt" svg="fa-solid fa-briefcase" subtitle="Titel, Beschreibung"></Block>
            <Block title="Skill" svg="fa-regular fa-star" subtitle="Fähigkeit / Tool"></Block>
          </div>
        </div>

        <div class="divider"></div>

        <div>
          <span class="sm-subtitle">Sections</span>

          <div class="mt-3 flex flex-col justify-center items-center gap-0.5">
            <Sections v-for="section in sortedSections" :key="section.id" :title="section.sectionType" :svg="getSvgToSectionType(section.sectionType)" :count="2"></Sections>

            <button @click="addSectionVisible = !addSectionVisible" class="transition-all duration-75 mt-2 select-none cursor-pointer group hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] hover:border-[var(--primary-color)] border-3 border-dashed border-gray-200 rounded-lg w-full flex items-center justify-center px-1 py-2 text-[var(--text-color-light)]">
              <div class="flex justify-center items-center gap-2">
                <div class="flex items-center justify-center">
                  <i class="fa-solid fa-plus"></i>
                </div>
                <span>Section hinzufügen</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <div class="flex flex-col w-full items-center justify-start min-h-0 h-full">
        <div class="w-full flex justify-center">
          <div class="px-5 py-3 max-w-[600px] xl:max-w-[900px] 2xl:max-w-[1200px] w-full h-fit border border-transparent border-b-gray-200 flex justify-between items-center">
            <div class="bg-[var(--surface-color)] border border-gray-200 rounded-lg flex justify-center items-center text-sm text-[var(--text-color-light)]">
              <ScreenButton :active="true" title="Desktop" svg="fa-solid fa-desktop"></ScreenButton>
              <ScreenButton :active="false"  title="Tablet" svg="fa-solid fa-tablet-screen-button"></ScreenButton>
              <ScreenButton :active="false"  title="Mobil" svg="fa-solid fa-mobile-screen"></ScreenButton>
            </div>

            <div class="text-[var(--text-color-light)] text-sm">
              <span>920 x auto - 100%</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full max-w-[1200px] px-5 2xl:px-0 py-10 flex-1 overflow-y-hidden min-h-0">
          <div class="flex flex-col gap-5 w-full box-content flex-1 min-h-0 overflow-y-scroll no-scrollbar">
            <SectionStruct v-for="section in sortedSections" @selected="sectionSelectedFunction(section.id)" :is-selected="sectionSelected === section.id" @delete="deleteSection(section.id)" :key="section.id" :name="section.sectionType" :title="section.title"></SectionStruct>

            <button @click="addSectionVisible = !addSectionVisible" class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75  px-4 py-3 select-none cursor-pointer text-[var(--text-color-light)] flex items-center justify-center gap-2 w-full h-fit rounded-lg border-2 border-dashed border-gray-200">
              <SvgStruct>
                <i class="fa-solid fa-plus"></i>
              </SvgStruct>
              <span>Section hinzufügen</span>
            </button>
          </div>
        </div>
      </div>

      <aside class="py-4 px-4 max-w-[350px] w-full min-w-[300px] shrink-0 h-full bg-[var(--surface-color)]">
        <div class="flex flex-col justify-center items-start gap-1">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center justify-center gap-2">
              <div class="mb-2 flex items-center justify-center w-[30px] h-[30px] bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-md">
                <i class="fa-solid fa-align-left text-[var(--primary-color)]"></i>
              </div>
              <span class="sm-subtitle">Text-Block</span>
            </div>
            <span class="text-xs text-[var(--primary-color)] bg-[var(--primary-color-light)] rounded-full px-2 py-1 font-semibold uppercase">Ausgewählt</span>
          </div>
          <span class="text-sm text-[var(--text-color-light)]">Section "Einführung" Block 1 von 2</span>
        </div>

        <div class="divider"></div>

        <div class="flex items-center justify-center w-full">
          <button class="hover:text-gray-500 w-full text-[var(--primary-color)] border-3 border-transparent border-b-[var(--primary-color)] px-2 py-2">Inhalt</button>
          <button class="hover:text-gray-500 w-full text-[var(--text-color-light)]">Layout</button>
          <button class="hover:text-gray-500 w-full text-[var(--text-color-light)]">Erweitert</button>
        </div>

        <div v-if="true" class="mt-5">
          <Content title=""></Content>
        </div>

      </aside>
    </div>
  </div>
</template>

<style scoped>
  .screen-active{
    background-color: var(--text-color);
    color: var(--text-color-white);
  }
</style>
