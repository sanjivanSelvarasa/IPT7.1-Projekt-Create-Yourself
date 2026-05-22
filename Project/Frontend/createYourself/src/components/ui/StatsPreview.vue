<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    value: string,
  }>()
</script>

<template>
  <div class="mt-5">
    <div class="flex flex-col items-start justify-center gap-2 text-sm font-semibold">
      <span class="text-[var(--text-color-light)] uppercase">{{ props.title }}</span>
      <span>{{ props.value }}</span>
    </div>
  </div>
</template>
