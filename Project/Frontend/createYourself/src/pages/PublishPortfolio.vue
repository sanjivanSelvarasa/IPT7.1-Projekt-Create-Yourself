<script lang="ts" setup>
import Background from "@/components/layout/Background.vue";
import NavApp from "@/components/layout/NavApp.vue";
import MainContent from "@/components/layout/MainContent.vue";
import HeaderComp from "@/components/layout/HeaderComp.vue";
import Interface from "@/components/ui/Interface.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import StatsPreview from "@/components/ui/StatsPreview.vue";
import StatsCard from "@/components/ui/StatsCard.vue";
import Subtitle from "@/components/ui/Subtitle.vue";
import Checklist from "@/components/ui/Checklist.vue";
import {computed, onMounted, ref} from "vue";
import {usePortfolioStore} from "@/stores/portfolioStore.ts";
import {useRoute, useRouter} from "vue-router";
import type {PortfolioType} from "@/types/portfolioType.ts";
import router from "@/router";
import PublishedNotification from "@/components/ui/PublishedNotification.vue";

const isPublic = ref<boolean>(true);

const route = useRoute();
const portfolioId = Number(route.params.id)
const portfolioStore = usePortfolioStore();

const portfolio = ref<any | null>(null);
const portfolioFacts = ref<PortfolioType | null>(null);

const checkTitleAndDescription = computed<boolean>(() => {
  return (portfolioFacts.value?.description !== null && portfolioFacts.value?.description.length !== 0) &&
    portfolioFacts.value?.title !== null && portfolioFacts.value?.title.length !== 0;
})

const checkLeastOneProject = computed<boolean>(() => {
  if(portfolio?.value === null) return false;
  return portfolio?.value.projects?.length > 0;
})

const checkLeastOneLink = computed<boolean>(() => {
  if(portfolio?.value === null) return false;
  return portfolio?.value.socialLinks?.length > 0;
})

const checkDesignIsChoosen = computed<boolean>(() => {
  if(portfolio?.value === null) return false;
  return portfolioFacts.value?.currentThemeId !== null
})

const isReadyToPublish = computed(() => {
  return checkTitleAndDescription.value && checkLeastOneProject.value && checkLeastOneLink.value && checkDesignIsChoosen.value
})

onMounted(async () => {
  portfolio.value = await portfolioStore.getFullPortfolioById(portfolioId) ?? null;
  portfolioFacts.value = portfolio.value.portfolio

  console.log(portfolioFacts.value)
})

async function pushToEditor(){
  await router.push(`/portfolio/${portfolioId}/editor`);
}

async function pushToPreview(){
  await router.push(`/portfolio/${portfolioId}/preview`);
}

const isPortfolioPublished = ref<boolean>(false);
const error = ref<string | null>(null);
async function publishPortfolio(){
  if(portfolioFacts.value === null) return;

 if(!isPublic.value) {
   error.value = "Keine öffentliche Sichtbarkeit angegeben.";
   return
 }
  error.value = null

  const publishedPortfolio : PortfolioType = {
    ...portfolioFacts.value,
    visibility: 'public',
  }

  try{
    await portfolioStore.updatePortfolio(publishedPortfolio)
    isPortfolioPublished.value = true
  }catch(err){
    error.value = err ? err.message : 'Portfolio konnte nicht öffentlich geschaltet werden.';
  }
}

const isCopied = ref<boolean>(false);
async function copySlug(){
  try{
    await navigator.clipboard.writeText(portfolioFacts.value?.slug ?? '')
    isCopied.value = true

    setTimeout(()=>{
      isCopied.value = false
    }, 2000)
  }catch{}
}

</script>

<template>
  <div v-if="isPortfolioPublished">
    <PublishedNotification :slug="portfolioFacts?.slug ?? '' "></PublishedNotification>
  </div>

  <Background>
    <NavApp></NavApp>

    <HeaderComp title="Portfolio veröffentlichen" tag="Freigeben" subtitle="Überprüfe die wichtisten Angaben, bevor dein Portfolio öffentlich erreichbar ist."></HeaderComp>

    <MainContent class="mb-5">
      <div class="grid grid-cols-6 gap-8 w-full">
        <div class="lg:col-span-4 col-span-6 flex flex-col items-start justify-center gap-6">
          <Interface class="relative flex items-center justify-start gap-5">
            <div v-if="isReadyToPublish" class="absolute top-0 left-0 w-1 h-full bg-green-500"></div>

            <div v-if="!isReadyToPublish" class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>

            <SvgStruct v-if="isReadyToPublish" class="min-w-[50px] min-h-[50px] rounded-2xl bg-green-50 border border-green-400 text-green-400">
              <i class="fa-solid fa-check"></i>
            </SvgStruct>

            <SvgStruct v-if="!isReadyToPublish" class="w-[50px] h-[50px] rounded-2xl bg-red-50 border border-red-400 text-red-400">
              <i class="fa-solid fa-x"></i>
            </SvgStruct>

            <div class="flex flex-col items-start justify-center gap-2">
              <span class="uppercase text-sm text-[var(--text-color-light)]">Status</span>
              <h2 v-if="isReadyToPublish">Bereit zur Veröffentlichung</h2>
              <h2 v-if="!isReadyToPublish">Noch nicht bereit zur Veröffentlichung</h2>
              <div class="flex flex-col md:flex-row items-start md:items-center justify-start gap-5 text-sm">
                <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)]">
                  <SvgStruct>
                    <i class="fa-regular fa-clock"></i>
                  </SvgStruct>
                  <span>Zuletzt gespeichert vor wenigen Minuten</span>
                </div>

                <div class="flex items-center justify-start gap-2">
                  <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)]">
                    <SvgStruct>
                      <i class="fa-solid fa-lock"></i>
                    </SvgStruct>
                    <span>Aktuell:</span>
                  </div>
                  <span class="text-xs px-2 py-1 text-gray-400 bg-gray-50 rounded-full font-semibold border border-gray-200 uppercase">{{ portfolioFacts?.visibility ?? 'LADE FEHLER' }}</span>
                </div>
              </div>
            </div>
          </Interface>

          <Interface>
            <Subtitle title="Portfolio-Zusammenfassung">
              <i class="fa-regular fa-address-card"></i>
            </Subtitle>

            <div class="grid grid-cols-2 gap-2">
              <StatsPreview class="col-span-1" title="Portfolio-Titel" :value="portfolioFacts?.title === null || portfolioFacts?.title.length === 0 ? 'Keinen Titel gewählt' : portfolioFacts?.title "></StatsPreview>
              <StatsPreview class="col-span-1" title="Hauptsprache" :value="portfolioFacts?.languageCode === null || portfolioFacts?.languageCode.length === 0 ? 'Keine Sprache ausgewählt' : portfolioFacts?.languageCode "></StatsPreview>
              <StatsPreview class="col-span-2" title="Kurzbeschreibung" :value="portfolioFacts?.description === null || portfolioFacts?.description.length === 0 ? 'Keine Beschreibung' : portfolioFacts?.description  "></StatsPreview>
              <StatsPreview title="Gewähltes Template" :value="portfolioFacts?.currentThemeId ?? 'Keine Ausgewählt' "></StatsPreview>
              <StatsPreview title="Sichtbarkeit" value="Private"></StatsPreview>
            </div>

            <div class="divider"></div>

            <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
              <StatsCard title="Projekte" :value="portfolio?.projects?.length ?? 0"></StatsCard>
              <StatsCard title="Skills" :value="portfolio?.skills?.length ?? 0"></StatsCard>
              <StatsCard title="Erfahrungen" :value="portfolio?.experiences?.length ?? 0"></StatsCard>
              <StatsCard title="Links" :value="portfolio?.socialLinks?.length ?? 0"></StatsCard>
            </div>
          </Interface>

          <Interface>
            <Subtitle title="Öffentlicher Link">
              <i class="fa-regular fa-star"></i>
            </Subtitle>

            <div class="flex items-center justify-start gap-2 overflow-hidden bg-gray-50 rounded-lg border border-gray-200 mt-5">
              <SvgStruct class="min-w-[50px] min-h-[50px] bg-gray-100 text-[var(--text-color-light)] text-sm border border-transparent border-r-gray-200">
                <i class="fa-solid fa-link"></i>
              </SvgStruct>
              <div class="w-full font-semibold text-sm sm:text-base">
                <span>createyourself/</span>
                <span class="text-[var(--primary-color)]">{{ portfolioFacts?.slug ?? 'Slug fehlgeschlagen' }}</span>
              </div>
              <button @click="copySlug()" class="hidden hover:bg-gray-50 transition duration-75 border border-transparent border-l-gray-200 px-3 py-3 bg-[var(--surface-color)] sm:flex items-center justify-center gap-2 text-nowrap">
                <SvgStruct>
                  <i class="fa-regular fa-clone"></i>
                </SvgStruct>
                <span v-if="!isCopied">Link kopieren</span>
                <span v-else>Link kopiert</span>
              </button>
            </div>

            <div class="mt-3 flex items-center justify-start gap-2 text-sm text-[var(--text-color-light)]">
              <SvgStruct>
                <i class="fa-solid fa-circle-info"></i>
              </SvgStruct>
              <span>
                Dieser Link ist nach der Veröffentlichung öffentlich erreichbar.
              </span>
            </div>
          </Interface>

          <Interface>
            <Subtitle title="Checkliste vor der Veröffentlichung">
              <i class="fa-solid fa-list-check"></i>
            </Subtitle>

            <ul class="mt-2">
              <Checklist title="Titel und Beschreibung vorhanden" :is-done="checkTitleAndDescription"></Checklist>
              <Checklist title="Mindestens ein Projekt hinzugefügt" :is-done="checkLeastOneProject"></Checklist>
              <Checklist title="Kontaktlink vorhanden" :is-done="checkLeastOneLink"></Checklist>
              <Checklist title="Design ausgewählt" :is-done="checkDesignIsChoosen"></Checklist>
              <Checklist title="Vorschau geprüft" :is-done="false"></Checklist>
            </ul>
          </Interface>

          <Interface>
            <Subtitle title="Sichtbarkeit festlegen">
              <i class="fa-regular fa-eye"></i>
            </Subtitle>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
              <button @click="isPublic = true" :class="isPublic ? 'visibility-active' : '' " class="hover:bg-gray-50 transition duration-75 flex items-start justify-start gap-3 px-4 py-3 border border-gray-200 rounded-xl">
                <SvgStruct v-if="!isPublic" class="radio text-[var(--text-color-light)] mt-1 text-lg">
                  <i class="fa-regular fa-circle"></i>
                </SvgStruct>

                <SvgStruct v-if="isPublic" class="radio text-[var(--text-color-light)] mt-1 text-lg">
                  <i class="fa-regular fa-circle-dot"></i>
                </SvgStruct>

                <div class="flex flex-col items-start justify-center gap-2">
                  <div class="flex items-center justify-start gap-2">
                    <SvgStruct>
                      <i class="fa-solid fa-globe"></i>
                    </SvgStruct>
                    <span class="font-semibold">Öffentlich</span>
                  </div>
                  <span class="text-[var(--text-color-light)] text-sm text-start">Jeder mit dem Link kann dein Portfolio sehen.</span>
                </div>
              </button>

              <button @click="isPublic = false" :class="!isPublic ? 'visibility-active' : '' " class="hover:bg-gray-50 transition duration-75 flex items-start justify-start gap-3 px-4 py-3 border border-gray-200 rounded-xl">
                <SvgStruct v-if="isPublic" class="radio text-[var(--text-color-light)] mt-1 text-lg">
                  <i class="fa-regular fa-circle"></i>
                </SvgStruct>

                <SvgStruct v-if="!isPublic" class="radio text-[var(--text-color-light)] mt-1 text-lg">
                  <i class="fa-regular fa-circle-dot"></i>
                </SvgStruct>
                <div class="flex flex-col items-start justify-center gap-2">
                  <div class="flex items-center justify-start gap-2">
                    <SvgStruct>
                      <i class="fa-solid fa-lock"></i>
                    </SvgStruct>
                    <span class="font-semibold">Privat lassen</span>
                  </div>
                  <span class="text-[var(--text-color-light)] text-sm text-start">Nur du kannst dein Portfolio einsehen.</span>
                </div>
              </button>
            </div>

            <div v-if="isPublic" class="mt-4 flex items-center justify-start gap-2 px-3 py-2 text-sm border border-amber-200 text-amber-600 rounded-xl bg-amber-50">
              <SvgStruct>
                <i class="fa-solid fa-triangle-exclamation"></i>
              </SvgStruct>
              <span>Wenn du dein Portfolio veröffentlichst, können Personen mit dem Link deine Inhalte ansehen.</span>
            </div>

            <div class="divider"></div>

            <div class="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2 w-full">
              <button @click="pushToEditor()" class="hover:text-[var(--text-color)] transition duration-75 text-nowrap flex items-center justify-start gap-2 text-[var(--text-color-light)]">
                <SvgStruct>
                  <i class="fa-solid fa-angle-left"></i>
                </SvgStruct>
                <span>Zurück zum Editor</span>
              </button>

              <div class="w-full flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-2 text-nowrap">
                <button @click="pushToPreview()" class="w-full sm:w-fit hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 sm:px-3 sm:py-2 p-4 border border-gray-200 rounded-lg bg-[var(--surface-color)] text-sm text-[var(--text-color)]">
                  <SvgStruct>
                    <i class="fa-solid fa-eye"></i>
                  </SvgStruct>
                  <span>Zurück zur Vorschau</span>
                </button>

                <button @click="publishPortfolio()" class="w-full sm:w-fit text-nowrap hover:text-[var(--primary-color)] hover:bg-transparent hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center border border-transparent gap-2 sm:px-3 sm:py-2 p-4 rounded-lg bg-[var(--primary-color)] text-sm text-[var(--text-color-white)]">
                  <SvgStruct>
                    <i class="fa-regular fa-paper-plane"></i>
                  </SvgStruct>
                  <span>Jetzt veröffentlichen</span>
                </button>
              </div>
            </div>

            <span class="text-red-500 mt-3">{{ error }}</span>
          </Interface>
        </div>

        <div class="col-span-2 lg:flex flex-col gap-6 hidden">
          <Interface class="h-fit">
            <div class="flex items-center justify-start text-sm gap-2 border border-transparent">
              <SvgStruct>
                <i class="fa-solid fa-eye"></i>
              </SvgStruct>
              <span>Live-Vorschau</span>
            </div>

            <div class="h-[400px] relative my-5">
              <div class="z-1 absolute top-0 left-[-50%] w-[100vw] bg-gray-200 h-[1px]"></div>
              <div class="absolute top-0 left-[-50%] w-[100vw] h-full bg-gray-50"></div>
              <div class="absolute bottom-0 left-[-50%] w-[100vw] bg-gray-200 h-[1px]"></div>
            </div>

            <div class="flex items-center justify-between gap-2 text-sm">
              <div class="flex items-center justify-start gap-2">
                <span class="text-[var(--text-color-light)]">Template: </span>
                <span class="font-semibold">{{ portfolioFacts?.currentThemeId ?? 'Keine Ausgewählt' }}</span>
              </div>

              <div class="flex items-center justify-start gap-2">
                <span class="text-[var(--text-color-light)]">Sprache: </span>
                <span class="font-semibold uppercase">{{ portfolioFacts?.languageCode ?? 'Nicht ausgewählt' }}</span>
              </div>
            </div>
          </Interface>

          <Interface class="text-sm flex items-start justify-center gap-2">
            <SvgStruct class="w-[35px] h-[35px] rounded-lg text-[var(--primary-color)] bg-[var(--primary-color-light)]">
              <i class="fa-solid fa-info"></i>
            </SvgStruct>
            <div class="flex flex-col items-start justify-center gap-2 flex-1">
              <span class="font-semibold">Du kannst alles später ändern</span>
              <span class="text-[var(--text-color-light)]">Inhalte, Sichtbarkeit und Design lassen sich auch nach der Veröffentlichung jederzeit anpassen.</span>
            </div>
          </Interface>
        </div>
      </div>
    </MainContent>
  </Background>
</template>

<style scoped>
  .visibility-active{
    border-color: var(--primary-color);
    background-color: var(--primary-color-light);
  }

  .visibility-active .radio{
    color: var(--primary-color);
  }
</style>
