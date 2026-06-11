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
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const tl = (key: string) => t(`publish.${key}`);

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

    <HeaderComp :title="tl('hero.Title')" :tag="tl('hero.Pre-Title')" :subtitle="tl('hero.Lead')"></HeaderComp>

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
              <span class="uppercase text-sm text-[var(--text-color-light)]">{{tl('status.Title')}}</span>
              <h2 v-if="isReadyToPublish">{{ tl('status.correct-or-incorrect.correct') }}</h2>
              <h2 v-if="!isReadyToPublish">{{ tl('status.correct-or-incorrect.incorrect') }}</h2>
              <div class="flex flex-col md:flex-row items-start md:items-center justify-start gap-5 text-sm">
                <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)]">
                  <SvgStruct>
                    <i class="fa-regular fa-clock"></i>
                  </SvgStruct>
                  <span>{{ tl('status.correct-or-incorrect.time') }}</span>
                </div>

                <div class="flex items-center justify-start gap-2">
                  <div class="flex justify-start items-center gap-2 text-[var(--text-color-light)]">
                    <SvgStruct>
                      <i class="fa-solid fa-lock"></i>
                    </SvgStruct>
                    <span>{{ tl('status.Privacy.now') }}:</span>
                  </div>
                  <span class="text-xs px-2 py-1 text-gray-400 bg-gray-50 rounded-full font-semibold border border-gray-200 uppercase">{{ portfolioFacts?.visibility ?? tl('status.Privacy.error') }}</span>
                </div>
              </div>
            </div>
          </Interface>

          <Interface>
            <Subtitle :title="tl('status.summary.Title')">
              <i class="fa-regular fa-address-card"></i>
            </Subtitle>

            <div class="grid grid-cols-2 gap-2">
              <StatsPreview class="col-span-1" :title="tl('status.summary.subtitle-one')" :value="portfolioFacts?.title === null || portfolioFacts?.title.length === 0 ? tl('status.summary.no-title') : portfolioFacts?.title "></StatsPreview>
              <StatsPreview class="col-span-1" :title="tl('status.summary.subtitle-two')" :value="portfolioFacts?.languageCode === null || portfolioFacts?.languageCode.length === 0 ? tl('status.summary.no-language') : portfolioFacts?.languageCode "></StatsPreview>
              <StatsPreview class="col-span-2" :title="tl('status.summary.subtitle-three')" :value="portfolioFacts?.description === null || portfolioFacts?.description.length === 0 ? tl('status.summary.no-description') : portfolioFacts?.description  "></StatsPreview>
              <StatsPreview :title="tl('status.summary.subtitle-four')" :value="portfolioFacts?.currentThemeId ?? tl('status.summary.subtitle-four-text') "></StatsPreview>
              <StatsPreview :title="tl('status.summary.subtitle-five')" :value="tl('status.summary.subtitle-five-text')"></StatsPreview>
            </div>

            <div class="divider"></div>

            <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
              <StatsCard :title="tl('status.summary.box-one')" :value="portfolio?.projects?.length ?? 0"></StatsCard>
              <StatsCard :title="tl('status.summary.box-two')" :value="portfolio?.skills?.length ?? 0"></StatsCard>
              <StatsCard :title="tl('status.summary.box-three')" :value="portfolio?.experiences?.length ?? 0"></StatsCard>
              <StatsCard :title="tl('status.summary.box-four')" :value="portfolio?.socialLinks?.length ?? 0"></StatsCard>
            </div>
          </Interface>

          <Interface>
            <Subtitle :title="tl('Link.Title')">
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
                <span v-if="!isCopied">{{ tl('Link.Copy-Link') }}</span>
                <span v-else>{{ tl('Link.Copied-Link') }}</span>
              </button>
            </div>

            <div class="mt-3 flex items-center justify-start gap-2 text-sm text-[var(--text-color-light)]">
              <SvgStruct>
                <i class="fa-solid fa-circle-info"></i>
              </SvgStruct>
              <span>
                {{ tl('Link.subtitle') }}
              </span>
            </div>
          </Interface>

          <Interface>
            <Subtitle :title="tl('checklist.Title')">
              <i class="fa-solid fa-list-check"></i>
            </Subtitle>

            <ul class="mt-2">
              <Checklist :title="tl('checklist.subtitle-one')" :is-done="checkTitleAndDescription"></Checklist>
              <Checklist :title="tl('checklist.subtitle-two')" :is-done="checkLeastOneProject"></Checklist>
              <Checklist :title="tl('checklist.subtitle-three')" :is-done="checkLeastOneLink"></Checklist>
              <Checklist :title="tl('checklist.subtitle-four')" :is-done="checkDesignIsChoosen"></Checklist>
              <Checklist :title="tl('checklist.subtitle-five')" :is-done="false"></Checklist>
            </ul>
          </Interface>

          <Interface>
            <Subtitle :title="tl('Visibility.Title')">
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
                    <span class="font-semibold">{{ tl('Visibility.left-box.Title') }}</span>
                  </div>
                  <span class="text-[var(--text-color-light)] text-sm text-start">{{ tl('Visibility.left-box.subtitle') }}</span>
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
                    <span class="font-semibold">{{ tl('Visibility.right-box.Title') }}</span>
                  </div>
                  <span class="text-[var(--text-color-light)] text-sm text-start">{{ tl('Visibility.right-box.subtitle') }}</span>
                </div>
              </button>
            </div>

            <div v-if="isPublic" class="mt-4 flex items-center justify-start gap-2 px-3 py-2 text-sm border border-amber-200 text-amber-600 rounded-xl bg-amber-50">
              <SvgStruct>
                <i class="fa-solid fa-triangle-exclamation"></i>
              </SvgStruct>
              <span>{{ tl('Visibility.Info') }}</span>
            </div>

            <div class="divider"></div>

            <div class="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2 w-full">
              <button @click="pushToEditor()" class="hover:text-[var(--text-color)] transition duration-75 text-nowrap flex items-center justify-start gap-2 text-[var(--text-color-light)]">
                <SvgStruct>
                  <i class="fa-solid fa-angle-left"></i>
                </SvgStruct>
                <span>{{ tl('Visibility.back-to-editor') }}</span>
              </button>

              <div class="w-full flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-2 text-nowrap">
                <button @click="pushToPreview()" class="w-full sm:w-fit hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 sm:px-3 sm:py-2 p-4 border border-gray-200 rounded-lg bg-[var(--surface-color)] text-sm text-[var(--text-color)]">
                  <SvgStruct>
                    <i class="fa-solid fa-eye"></i>
                  </SvgStruct>
                  <span>{{ tl('Visibility.back-to-preview') }}</span>
                </button>

                <button @click="publishPortfolio()" class="w-full sm:w-fit text-nowrap hover:text-[var(--primary-color)] hover:bg-transparent hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center border border-transparent gap-2 sm:px-3 sm:py-2 p-4 rounded-lg bg-[var(--primary-color)] text-sm text-[var(--text-color-white)]">
                  <SvgStruct>
                    <i class="fa-regular fa-paper-plane"></i>
                  </SvgStruct>
                  <span>{{ tl('Visibility.publish') }}</span>
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
              <span>{{ tl('status.Live-Preview.Title') }}</span>
            </div>

            <div class="h-[400px] relative my-5">
              <div class="z-1 absolute top-0 left-[-50%] w-[100vw] bg-gray-200 h-[1px]"></div>
              <div class="absolute top-0 left-[-50%] w-[100vw] h-full bg-gray-50"></div>
              <div class="absolute bottom-0 left-[-50%] w-[100vw] bg-gray-200 h-[1px]"></div>
            </div>

            <div class="flex items-center justify-between gap-2 text-sm">
              <div class="flex items-center justify-start gap-2">
                <span class="text-[var(--text-color-light)]">{{ tl('status.Live-Preview.Template') }}: </span>
                <span class="font-semibold">{{ portfolioFacts?.currentThemeId ?? tl('status.Live-Preview.Template-chosen') }}</span>
              </div>

              <div class="flex items-center justify-start gap-2">
                <span class="text-[var(--text-color-light)]">{{ tl('status.Live-Preview.language') }}: </span>
                <span class="font-semibold uppercase">{{ portfolioFacts?.languageCode ?? tl('status.Live-Preview.language-chosen') }}</span>
              </div>
            </div>
          </Interface>

          <Interface class="text-sm flex items-start justify-center gap-2">
            <SvgStruct class="w-[35px] h-[35px] rounded-lg text-[var(--primary-color)] bg-[var(--primary-color-light)]">
              <i class="fa-solid fa-info"></i>
            </SvgStruct>
            <div class="flex flex-col items-start justify-center gap-2 flex-1">
              <span class="font-semibold">{{ tl('Info.Title') }}</span>
              <span class="text-[var(--text-color-light)]">{{ tl('Info.subtitle') }}</span>
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
