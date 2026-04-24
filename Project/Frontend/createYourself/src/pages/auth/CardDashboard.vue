<script lang="ts" setup>

</script>

<template>
  <div class="hover:shadow-lg transition duration-150 relative bg-[var(--surface-color)] w-full h-[350px] aspect-square rounded-2xl overflow-hidden border border-gray-200">
    <div class="absolute top-0 left-0 w-full h-1 bg-[var(--primary-color)]"></div>

    <div class="dotted-bg w-full h-[150px] flex items-center justify-center border border-transparent border-b-gray-200">
      <div class="flex items-center justify-center w-[45px] h-[45px] bg-[var(--surface-color)] text-[var(--primary-color)] shadow-lg rounded-lg">
        <i class="fa-solid fa-computer"></i>
      </div>
    </div>

    <div class="flex flex-col items-start justify-center gap-1 px-4 py-4">
      <span class="font-semibold">Design Portfolio 2026</span>
      <span class="text-[var(--text-color-light)] text-sm">UI / UX-Projekte, Case Studies und visuelle Arbeiten aus zwei Jahren freiberuflicher ...</span>
    </div>

    <div class="w-full h-[1px] bg-gray-200 my-3"></div>

    <div class="flex items-center justify-start text-nowrap text-xs">
      <div class="flex items-center justify-start gap-2 px-4 text-[var(--text-color-light)]">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-calendar"></i>
        </div>
        <span>Geändert: 19. Apr. 2026</span>
      </div>

      <div class="flex items-center justify-start gap-2 text-[var(--text-color-light)]">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-eye"></i>
        </div>
        <span>845 Aufrufe</span>
      </div>
    </div>

    <div class="flex items-center justify-start">
      <button class="cursor-pointer mt-3 flex items-center justify-center gap-2 text-[var(--primary-color)] text-sm ml-4 px-3 py-1 bg-[var(--primary-color-light)] border border-blue-200 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <span>Bearbeiten</span>
      </button>

      <button class="cursor-pointer mt-3 flex items-center justify-center gap-2 text-[var(--accent-color)] text-sm ml-4 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center justify-center">
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </div>
        <span>Veröffentlichen</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .dotted-bg {
    background-image: radial-gradient(var(--primary-color) 1px, var(--primary-color-light) 0);
    background-size: 20px 20px;
  }
</style>
