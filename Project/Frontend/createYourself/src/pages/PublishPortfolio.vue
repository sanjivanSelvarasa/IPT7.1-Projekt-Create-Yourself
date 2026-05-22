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
import {ref} from "vue";

const isPublic = ref<boolean>(true);
</script>

<template>
  <Background>
    <NavApp></NavApp>

    <HeaderComp title="Portfolio veröffentlichen" tag="Freigeben" subtitle="Überprüfe die wichtisten Angaben, bevor dein Portfolio öffentlich erreichbar ist."></HeaderComp>

    <MainContent class="mb-5">
      <div class="grid grid-cols-6 gap-8 w-full">
        <div class="col-span-4 flex flex-col items-start justify-center gap-6">
          <Interface class="relative flex items-center justify-start gap-5">
            <div v-if="true" class="absolute top-0 left-0 w-1 h-full bg-green-500"></div>

            <div v-if="false" class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>

            <SvgStruct v-if="true" class="w-[50px] h-[50px] rounded-2xl bg-green-50 border border-green-400 text-green-400">
              <i class="fa-solid fa-check"></i>
            </SvgStruct>

            <SvgStruct v-if="false" class="w-[50px] h-[50px] rounded-2xl bg-red-50 border border-red-400 text-red-400">
              <i class="fa-solid fa-x"></i>
            </SvgStruct>

            <div class="flex flex-col items-start justify-center gap-2">
              <span class="uppercase text-sm text-[var(--text-color-light)]">Status</span>
              <h2 v-if="true">Bereit zur Veröffentlichung</h2>
              <h2 v-if="false">Noch nicht bereit zur Veröffentlichung</h2>
              <div class="flex items-center justify-start gap-5 text-sm">
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
                  <span class="text-xs px-2 py-1 text-gray-400 bg-gray-50 rounded-full font-semibold border border-gray-200">Privat</span>
                </div>
              </div>
            </div>
          </Interface>

          <Interface>
            <Subtitle title="Portfolio-Zusammenfassung">
              <i class="fa-regular fa-address-card"></i>
            </Subtitle>

            <div class="grid grid-cols-2 gap-2">
              <StatsPreview class="col-span-1" title="Portfolio-Titel" value="Max Mustermann - Web Developer"></StatsPreview>
              <StatsPreview class="col-span-1" title="Hauptsprache" value="Deutsch"></StatsPreview>
              <StatsPreview class="col-span-2" title="Kurzbeschreibung" value="Junior Web Entwickler mit Fokus auf modernes Frontend, Vue.js und UI-Design."></StatsPreview>
              <StatsPreview title="Gewähltes Template" value="Minimal"></StatsPreview>
              <StatsPreview title="Sichtbarkeit" value="Private"></StatsPreview>
            </div>

            <div class="divider"></div>

            <div class="grid grid-cols-4 gap-2">
              <StatsCard title="Projekte" value="6"></StatsCard>
              <StatsCard title="Skills" value="12"></StatsCard>
              <StatsCard title="Erfahrungen" value="3"></StatsCard>
              <StatsCard title="Links" value="4"></StatsCard>
            </div>
          </Interface>

          <Interface>
            <Subtitle title="Öffentlicher Link">
              <i class="fa-regular fa-star"></i>
            </Subtitle>

            <div class="flex items-center justify-start gap-2 overflow-hidden bg-gray-50 rounded-lg border border-gray-200 mt-5">
              <SvgStruct class="w-[75px] h-[50px] bg-gray-100 text-[var(--text-color-light)] text-sm border border-transparent border-r-gray-200">
                <i class="fa-solid fa-link"></i>
              </SvgStruct>
              <div class="w-full font-semibold">
                <span>createyourself/</span>
                <span class="text-[var(--primary-color)]">max-mustermann</span>
              </div>
              <button class="hover:bg-gray-50 transition duration-75 border border-transparent border-l-gray-200 px-3 py-3 bg-[var(--surface-color)] flex items-center justify-center gap-2 text-nowrap">
                <SvgStruct>
                  <i class="fa-regular fa-clone"></i>
                </SvgStruct>
                <span>Link kopieren</span>
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
              <Checklist title="Titel und Beschreibung vorhanden" :is-done="true"></Checklist>
              <Checklist title="Mindestens ein Projekt hinzugefügt" :is-done="true"></Checklist>
              <Checklist title="Kontaktlink vorhanden" :is-done="true"></Checklist>
              <Checklist title="Design ausgewählt" :is-done="true"></Checklist>
              <Checklist title="Vorschau geprüft" :is-done="false"></Checklist>
            </ul>
          </Interface>

          <Interface>
            <Subtitle title="Sichtbarkeit festlegen">
              <i class="fa-regular fa-eye"></i>
            </Subtitle>

            <div class="grid grid-cols-2 gap-2 mt-5">
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

            <div class="flex items-center justify-between gap-2">
              <RouterLink to="/editor" class="hover:text-[var(--text-color)] transition duration-75 flex items-center justify-start gap-2 text-[var(--text-color-light)]">
                <SvgStruct>
                  <i class="fa-solid fa-angle-left"></i>
                </SvgStruct>
                <span>Zurück zum Editor</span>
              </RouterLink>

              <div class="flex items-center justify-center gap-2">
                <button class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-[var(--surface-color)] text-sm text-[var(--text-color)]">
                  <SvgStruct>
                    <i class="fa-solid fa-eye"></i>
                  </SvgStruct>
                  <span>Zurück zur Vorschau</span>
                </button>

                <button class="hover:text-[var(--primary-color)] hover:bg-transparent hover:border-[var(--primary-color)] transition duration-75 flex items-center justify-center border border-transparent gap-2 px-3 py-2 rounded-lg bg-[var(--primary-color)] text-sm text-[var(--text-color-white)]">
                  <SvgStruct>
                    <i class="fa-regular fa-paper-plane"></i>
                  </SvgStruct>
                  <span>Jetzt veröffentlichen</span>
                </button>
              </div>
            </div>
          </Interface>
        </div>

        <div class="col-span-2 flex flex-col gap-6">
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
                <span class="font-semibold">Minimal</span>
              </div>

              <div class="flex items-center justify-start gap-2">
                <span class="text-[var(--text-color-light)]">Sprache: </span>
                <span class="font-semibold">DE</span>
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
