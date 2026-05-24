<script lang="ts" setup>

import Interface from "@/components/ui/Interface.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import SectionCard from "@/components/ui/editor/SectionCard.vue";

const emit = defineEmits<{
  (e: 'submit', section: string) : void,
}>()

function submitSection() : void {
  emit('submit', '')
}


</script>

<template>
  <div class="flex items-center justify-center z-9999 fixed inset-0 w-[100vw] h-[100vh] bg-transparent backdrop-blur-sm">
    <Interface class="max-w-[1200px]">
      <div>
        <h2>Neue Section hinzufügen</h2>
        <span class="text-sm text-[var(--text-color-light)]">Wähle einen Bereich aus, den du deinem Portfolio hinzufügen möchstest.</span>
      </div>

      <div class="divider"></div>

      <div>
        <div class="py-2 px-3 flex items-center justify-start w-full gap-2 text-[var(--text-color-light)] rounded-lg bg-gray-50 border border-gray-200">
          <SvgStruct>
            <i class="fa-solid fa-search"></i>
          </SvgStruct>
          <input class="w-full rounded-none! text-[var(--text-color)]" type="search" placeholder="Section suchen ...">
        </div>

        <div class="grid grid-cols-3 gap-4 w-full mt-5">
          <SectionCard class="grid-cols-1" title="Hero Section" description="Startbereich mit Name, Titel und kürzer Vorstellung">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)]  text-[var(--text-color-white)]">
                <i class="fa-regular fa-user"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div  class="flex flex-col gap-1 items-center justify-center w-full h-full">
                <div class="w-[15px] h-[15px] rounded-full bg-gray-200"></div>
                <div class="w-[45px] h-[5px] rounded-full bg-gray-300"></div>
                <div class="w-[40px] h-[3px] rounded-full bg-gray-200"></div>
                <div class="w-[30px] h-[5px] rounded-full bg-blue-500"></div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Projekte" description="Zeige deine wichtigsten Arbeiten und Projektlinks">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-violet-50  text-violet-500">
                <i class="fa-solid fa-diagram-project"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center w-full h-full">
                <div class="grid grid-cols-3 gap-1">
                  <div class="w-[45px] h-[32px] bg-gray-200 rounded-md"></div>
                  <div class="w-[45px] h-[32px] bg-gray-300 rounded-md"></div>
                  <div class="w-[45px] h-[32px] bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Skills" description="Präsentiere deine Fähigkeiten mit Level oder Tags.">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-green-50  text-green-500">
                <i class="fa-solid fa-chart-line"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center gap-4 w-full h-full">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="relative w-[40px] h-[7px] rounded-full overflow-hidden bg-gray-200">
                    <div class="absolute top-0 left-0 w-[30px] h-[7px] rounded-full bg-green-500"></div>
                  </div>
                  <div class="relative w-[40px] h-[7px] rounded-full overflow-hidden bg-gray-200">
                    <div class="absolute top-0 left-0 w-[25px] h-[7px] rounded-full bg-blue-500"></div>
                  </div>
                  <div class="relative w-[40px] h-[7px] rounded-full overflow-hidden bg-gray-200">
                    <div class="absolute top-0 left-0 w-[35px] h-[7px] rounded-full bg-violet-500"></div>
                  </div>
                </div>

                <div class="grid grid-cols-6 gap-1 w-[60px]">
                  <div class="col-span-2 bg-gray-200 rounded-full h-[9px]"></div>
                  <div class="col-span-4 bg-gray-200 rounded-full h-[9px]"></div>
                  <div class="col-span-3 bg-gray-200 rounded-full h-[9px]"></div>
                  <div class="col-span-3 bg-gray-200 rounded-full h-[9px]"></div>
                </div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Erfahrung" description="Liste berufliche Stationen oder Praktika auf.">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-yellow-50  text-yellow-500">
                <i class="fa-solid fa-briefcase"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center gap-2 w-full h-full">
                <div class="relative flex flex-col items-center justify-center gap-1">
                  <div class="z-1 w-[10px] h-[10px] bg-orange-300 rounded-full"></div>
                  <div class="w-[10px] h-[10px] bg-gray-200 rounded-full"></div>
                  <div class="w-[10px] h-[10px] bg-gray-200 rounded-full"></div>
                  <div class="z-0 absolute top-[5px] left-[4px] w-[2px] h-[30px] bg-gray-200 rounded-full"></div>
                </div>

                <div class="flex flex-col items-start justify-start gap-1">
                  <div class="bg-gray-300 w-[50px] h-[4px] rounded-full"></div>
                  <div class="bg-gray-200 w-[35px] h-[4px] rounded-full"></div>
                  <div class="bg-gray-200 w-[45px] h-[4px] rounded-full"></div>
                  <div class="bg-gray-200 w-[35px] h-[5px] rounded-full"></div>
                </div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Ausbildung" description="Zeige Schule, Studium oder Weiterbildungen.">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-cyan-50  text-cyan-500">
                <i class="fa-solid fa-graduation-cap"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center gap-4 w-full h-full">
                <div class="w-[60px] h-[30px] border border-gray-300 rounded-md px-1 py-1 flex flex-col gap-1">
                  <div class="w-[40px] h-[5px] rounded-full bg-gray-400"></div>
                  <div class="w-[30px] h-[3px] rounded-full bg-gray-300"></div>
                  <div class="w-[15px] h-[5px] rounded-full bg-cyan-600"></div>
                </div>

                <div class="w-[60px] h-[30px] border border-gray-300 rounded-md px-1 py-1 flex flex-col gap-1">
                  <div class="w-[40px] h-[5px] rounded-full bg-gray-400"></div>
                  <div class="w-[30px] h-[3px] rounded-full bg-gray-300"></div>
                  <div class="w-[15px] h-[5px] rounded-full bg-cyan-600"></div>
                </div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Kontakt & Social" description="Füge Kontaktmöglichkeiten und Social-Media-Links hinzu.">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-red-50  text-red-500">
                <i class="fa-regular fa-envelope"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center gap-2 w-full h-full">
                <SvgStruct class="w-[20px] h-[20px] text-[10px] border border-gray-200 rounded-full text-red-500">
                  <i class="fa-regular fa-envelope"></i>
                </SvgStruct>
                <SvgStruct class="w-[20px] h-[20px] text-[10px] border border-gray-200 rounded-full text-[var(--text-color-light)]">
                  <i class="fa-regular fa-clock"></i>
                </SvgStruct>
                <div class="flex items-center justify-center w-[20px] h-[20px] border border-gray-200 rounded-full">
                  <div class="bg-[var(--text-color-light)] w-[8px] h-[8px] rounded-xs"></div>
                </div>
                <div class="flex items-center justify-center w-[20px] h-[20px] border border-gray-200 rounded-full">
                  <div class="bg-[var(--text-color-light)] w-[8px] h-[8px] rounded-sm"></div>
                </div>
              </div>
            </template>
          </SectionCard>

          <SectionCard class="grid-cols-1" title="Freie Section" description="Erstelle einen eigenen Bereich mit Text und Blöcken.">
            <template #svg>
              <SvgStruct class="min-w-[35px] min-h-[35px] rounded-lg bg-gray-50  text-gray-500">
                <i class="fa-regular fa-pen-to-square"></i>
              </SvgStruct>
            </template>

            <template #visual>
              <div class="flex items-center justify-center gap-4 w-full h-full">
                <div class="w-[120px] h-[30px] border border-dashed border-gray-300 rounded-md px-1 py-1 flex items-center justify-center gap-2">
                  <div class="flex flex-col gap-1">
                    <div class="w-[40px] h-[5px] rounded-full bg-gray-300"></div>
                    <div class="w-[70px] h-[5px] rounded-full bg-gray-200"></div>
                  </div>
                  <div class="w-[20px] h-[20px] rounded-sm bg-gray-200"></div>
                </div>
              </div>
            </template>
          </SectionCard>
        </div>
      </div>

      <div class="divider"></div>

      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center justify-center gap-2 text-sm text-[var(--text-color-light)]">
          <SvgStruct>
            <i class="fa-solid fa-circle-info"></i>
          </SvgStruct>
          <span>Tipp: Sections sind später per Drag-and-Drop verschiebbar.</span>
        </div>

        <div class="flex items-center justify-center gap-2">
          <button class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 px-3 py-2 border border-gray-200 rounded-lg text-sm">Abbrechen</button>

          <button class="hover:border-[var(--primary-color)] hover:from-transparent hover:to-transparent hover:text-[var(--primary-color)] transition duration-75 border border-b-transparent flex items-center justify-center gap-1 text-sm text-[var(--text-color-white)] rounded-lg bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)] px-3 py-2">
            <span>Section hinzufügen</span>
            <SvgStruct>
              <i class="fa-solid fa-plus"></i>
            </SvgStruct>
          </button>
        </div>
      </div>
    </Interface>
  </div>
</template>
