<script lang="ts" setup>
  const props = defineProps<{
    svg: string,
    title: string,
    subtitle: string,
  }>();
</script>

<template>
  <div class="hover:border-[var(--primary-color)] cursor-grab select-none flex flex-col items-start justify-start px-3 py-3 border border-gray-200 rounded-lg">
    <div class="mb-2 flex items-center justify-center w-[30px] h-[30px] bg-[var(--primary-color-light)] text-[var(--primary-color)] rounded-md">
      <i :class="props.svg"></i>
    </div>
    <span class="font-semibold">{{ props.title }}</span>
    <span class="font-light text-[var(--text-color-light)] text-wrap text-sm">{{ props.subtitle }}</span>
  </div>
</template>

