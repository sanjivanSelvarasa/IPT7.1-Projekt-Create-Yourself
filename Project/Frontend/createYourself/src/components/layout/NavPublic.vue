<script lang="ts" setup>
import {onMounted, ref} from "vue";
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    firstname: string,
    lastname: string,
    tabs: {
      sectionType: string,
      id: number
    }[],
  }>()

  const showBugermenu = ref<boolean>(false);
</script>

<template>
  <div class="z-999 fixed top-0 left-0 w-full bg-[var(--surface-color)] shadow-sm h-[65px] flex items-center justify-center">
    <div class="flex flex-row-reverse sm:flex-row items-center justify-between w-[1200px] px-4 py-2 h-full">

      <a class="font-semibold text-lg !bg-transparent">
        {{ props.firstname }}<span class="bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">{{ props.lastname }}</span>
      </a>

      <!-- Burger menu-->
      <div class="sm:hidden block cursor-pointer text-[var(--text-color)] text-xl">
        <button @click="showBugermenu = !showBugermenu" class="cursor-pointer flex items-center justify-center">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div :class="showBugermenu ? 'active-burger-menu' : '' " class="hidden absolute top-16.5 left-0 z-999 w-full h-fit bg-[var(--surface-color)] mx-2 py-3">
          <ul class="flex flex-col items-center justify-center gap-3 text-sm text-[var(--text-color-light)] font-semibold">
            <li v-for="tab in props.tabs" :key="tab.id" class="w-full hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200 cursor-pointer">
              <a :href=" '#' + tab.id" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
                <span>{{ tab.sectionType }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Section Links-->
      <div class="sm:flex hidden h-full items-center">
        <ul class="flex items-center justify-center gap-4 text-sm text-[var(--text-color-light)] font-semibold">
          <li v-for="tab in props.tabs" :key="tab.id" class="select-none hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg transition duration-200 cursor-pointer">
            <a :href=" '#' + tab.id" class="cursor-pointer rounded-lg flex items-center justify-center gap-2 px-2 py-2">
              <span>{{ tab.sectionType }}</span>
            </a>
          </li>
        </ul>
      </div>

      <a :href="`#${props.tabs?.find(s => s.sectionType === 'Kontakt & Social')?.id ?? null}`" class="sm:flex select-none hover:bg-[var(--surface-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 border border-transparent hidden justify-center items-center gap-2 px-4 py-3 rounded-xl bg-[var(--primary-color)] text-[var(--text-color-white)] shadow-sm text-sm font-semibold">
        <span>Kontakt aufnehmen</span>
        <SvgStruct>
          <i class="fa-solid fa-arrow-right"></i>
        </SvgStruct>
      </a>
    </div>
  </div>
</template>

<style>
.active-burger-menu{
  display: block;
}
</style>
