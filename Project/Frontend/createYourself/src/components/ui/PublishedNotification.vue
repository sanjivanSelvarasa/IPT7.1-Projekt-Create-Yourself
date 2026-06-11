<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import router from "@/router";
  import {ref} from "vue";

  const props = defineProps<{
    slug: string,
  }>()

  function pushToPublic(){
    window.open(`/${props.slug}`, '_blank');
  }

  const isCopied = ref<boolean>(false);
  const apiUrl = 'https://create-yourself.gian.ink'
  async function copySlug(){
    await navigator.clipboard.writeText(apiUrl + '/' + props.slug);
    isCopied.value = true;

    setTimeout(() => {
      isCopied.value = false;
    }, 2000)
  }
</script>

<template>
  <div class="fixed flex items-center justify-center bg-backdrop inset-0 z-9999 backdrop-blur-xs">
    <div class="relative flex flex-col items-center justify-start gap-4 min-w-[550px] min-h-[550px] p-8 rounded-3xl bg-[var(--surface-color)] shadow-xl border border-gray-200 overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-[200px] bg-linear-to-b from-green-50 to-white z-1"></div>

      <SvgStruct class="z-2 w-[80px] h-[80px] rounded-full bg-linear-to-br from-green-500 to-green-600 text-white border-7 border-white text-3xl">
        <i class="fa-solid fa-check"></i>
      </SvgStruct>
      <div class="z-2 flex flex-col gap-2 items-center">
        <h2 class="text-[30px]!">Portfolio veröffentlicht</h2>
        <span class="text-[var(--text-color-light)] text-md text-center text-wrap max-w-[400px]">Dein Portfolio ist jetzt über den öffentlichen Link erreichbar.</span>
      </div>

      <div class="w-full mt-7 flex flex-col gap-4">
        <div class="w-full flex items-center justify-start rounded-xl gap-4 px-4 py-3 bg-gray-50 border border-gray-200 text-[var(--text-color)] font-semibold">
          <SvgStruct class="w-[35px] h-[35px] rounded-lg border border-gray-200 text-[var(--primary-color)] text-sm">
            <i class="fa-solid fa-link"></i>
          </SvgStruct>
          <span>{{ apiUrl + '/' + props.slug }}</span>
        </div>

        <button @click="pushToPublic()" class="hover:bg-[var(--surface-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 border border-transparent flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] py-3 px-4 rounded-xl text-[var(--text-color-white)] font-semibold">
          <SvgStruct>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </SvgStruct>
          <span>Öffentliches Portfolio öffnen</span>
        </button>

        <button @click="copySlug()" :class="isCopied ? 'copied' : '' " class="hover:bg-gray-50 hover:border-gray-400 transition duration-75 outline-none flex items-center justify-center gap-3 w-full bg-[var(--surface-color)] py-3 px-4 rounded-xl text-[var(--text-color)] font-semibold border border-gray-200">
          <SvgStruct>
            <i class="fa-regular fa-copy"></i>
          </SvgStruct>
          <span v-if="!isCopied">Link kopieren</span>
          <span v-else>Link wurde kopiert!</span>
        </button>

        <RouterLink to="/dashboard" class="hover:text-[var(--primary-color)] mt-2 text-center font-semibold text-[var(--text-color-light)]">Zurück zum Dashboard</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg-backdrop{
    background-color: rgba(113, 107, 107, 0.18);
  }

  .copied{
    border-color: var(--color-green-500);
    color: var(--color-green-500);
    background: var(--color-green-50);
  }
</style>
