<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    value: number,
  }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-center gap-4 w-full">
      <span class="font-semibold">{{ props.title.slice(0, 35) }}</span>
      <span class="font-semibold text-[var(--primary-color)]">{{ props.value }}%</span>
    </div>
    <div class="relative w-full h-[10px] rounded-full bg-gray-100 overflow-hidden">
      <div :style="{ width: `${props.value}%` }" class="absolute rounded-full w-full h-full bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)]"></div>
    </div>
  </div>
</template>
