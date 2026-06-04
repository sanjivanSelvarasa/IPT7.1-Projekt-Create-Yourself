<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    value: number,
  }>()
</script>

<template>
  <div class="col-span-1 flex flex-col items-start justify-center px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl">
    <span class="font-semibold text-2xl">{{ props.value }}</span>
    <span class="text-[var(--text-color-light)] text-sm font-semibold">{{ props.title }}</span>
  </div>
</template>
