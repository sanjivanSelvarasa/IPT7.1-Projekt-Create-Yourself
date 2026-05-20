<script lang="ts" setup>
  const props = defineProps<{
    title: string,
  }>()
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-1">
    <label class="font-semibold text-md">{{ props.title }}</label>
    <slot></slot>
  </div>
</template>
