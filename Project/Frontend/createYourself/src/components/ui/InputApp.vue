<script lang="ts" setup>
  const props = defineProps<{
    name: string,
    for: string,
  }>()
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-1 w-full">
    <label class="font-medium text-sm" :for="props.for">{{ props.name }}</label>
    <slot></slot>
  </div>
</template>
