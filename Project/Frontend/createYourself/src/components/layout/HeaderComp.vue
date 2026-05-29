<script lang="ts" setup>
  const props = defineProps<{
    tag: string,
    title: string,
    subtitle: string,
  }>()
</script>

<template>
  <header class="w-full mt-25 sm:mt-40 max-w-[1200px] xl:mx-auto px-5 text-center sm:text-left">
    <div class="flex flex-col items-center sm:items-start justify-between gap-2">
      <span class="uppercase text-[var(--primary-color)]">{{ props.tag }}</span>
      <h1>{{ props.title }}</h1>
      <span class="text-[var(--text-color-light)] text-wrap max-w-[750px] text-center sm:text-left">{{ props.subtitle }}</span>
    </div>
  </header>
</template>
