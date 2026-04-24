<script lang="ts" setup>

import NavApp from "@/components/layout/NavApp.vue";
import CardDashboard from "@/pages/auth/CardDashboard.vue";
</script>

<template>
  <div class="bg-[var(--background-color)] w-full min-h-[100vh] h-full absolute top-0 left-0">
    <div class="absolute w-full h-full grid-bg -z-99"></div>
    <NavApp></NavApp>
    <header class="w-full flex items-center justify-between gap-5 mt-40 max-w-[1200px] mx-auto">
      <div class="flex flex-col items-start justify-between gap-2">
        <span class="uppercase text-[var(--primary-color)]">Übersicht</span>
        <h1>Meine Portfolios</h1>
        <span class="text-[var(--text-color-light)]">Verwalte, bearbeite und veröffentliche deine Portfolios</span>
      </div>

      <div>
        <button class="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-color)] rounded-lg shadow-lg text-[var(--text-color-white)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-plus"></i>
          </div>
          <span>Neues Portfolio</span>
        </button>
      </div>
    </header>

    <main class="w-full flex flex-col items-start justify-center gap-10 mt-10 max-w-[1200px] mx-auto">
      <div class="flex items-center justify-start gap-5 w-full">
        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-gray-500"></div>
            <span class="text-sm text-[var(--text-color-light)]">Gesamt <span class="text-[var(--text-color)] font-bold ml-2">5</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-[var(--accent-color)]"></div>
            <span class="text-sm text-[var(--text-color-light)]">Veröffentlicht <span class="text-[var(--text-color)] font-bold ml-2">3</span> </span>
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-color)] shadow-lg">
            <div class="rounded-full w-[10px] h-[10px] bg-orange-400"></div>
            <span class="text-sm text-[var(--text-color-light)]">Entwurf <span class="text-[var(--text-color)] font-bold ml-2">2</span> </span>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4">
        <div class="w-[450px] border border-gray-200 cursor-pointer flex items-center justify-center gap-4 px-4 py-2 rounded-lg bg-[var(--surface-color)] shadow-lg">
          <div class="text-[var(--text-color-light)] flex items-center justify-center">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input class="outline-none w-full" type="search" placeholder="Portfolio suchen ..." />
        </div>

        <div>
          <select class="shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer" name="cars" id="cars">
            <option value="volvo">Alle Status</option>
            <option value="saab">Veröffentlicht</option>
            <option value="mercedes">Entwurf</option>
          </select>
        </div>

        <div class="flex items-center justify-center gap-2 shadow-lg px-4 py-2 text-[var(--text-color-light)] outline-none border border-gray-200 rounded-lg bg-[var(--surface-color)] cursor-pointer">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-sort"></i>
          </div>
          <span class="text-[var(--text-color-light)] ">Sortieren</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 grid-rows-[auto_1fr]">
        <CardDashboard v-for="i in 5"></CardDashboard>
      </div>
    </main>
  </div>
</template>
