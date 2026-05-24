<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    description: string,
    isSelected: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'pressed') : void,
  }>()

  function onPressed() {
    emit('pressed')
  }
</script>

<template>
  <button @click="onPressed()" class="hover:shadow-lg hover:border-gray-300 hover:-translate-y-[2px] transition duration-150 cursor-pointer aspect-[14/9] flex flex-col items-start justify-start gap-2 select-none w-full border border-gray-200 rounded-2xl overflow-hidden px-5 py-5 bg-[var(--surface-color)]">
    <slot name="svg"></slot>
    <div class="flex flex-col items-start justify-center gap-1">
      <span class="font-semibold">{{ props.title }}</span>
      <span class="text-[var(--text-color-light)] text-sm">{{ props.description }}</span>
    </div>

    <div class="w-full h-full px-2 py-2 rounded-lg border border-gray-200 bg-gray-50">
      <slot name="visual"></slot>
    </div>
  </button>
</template>
