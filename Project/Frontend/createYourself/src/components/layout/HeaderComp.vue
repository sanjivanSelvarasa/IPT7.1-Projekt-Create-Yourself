<script lang="ts" setup>
  const props = defineProps<{
    tag: string,
    title: string,
    subtitle: string,
  }>()
</script>

<template>
  <header class="w-full flex items-center justify-between gap-5 mt-40 max-w-[1200px] xl:mx-auto px-5">
    <div class="flex flex-col items-start justify-between gap-2">
      <span class="uppercase text-[var(--primary-color)]">{{ props.tag }}</span>
      <h1>{{ props.title }}</h1>
      <span class="text-[var(--text-color-light)] text-wrap max-w-[750px]">{{ props.subtitle }}</span>
    </div>
  </header>
</template>
