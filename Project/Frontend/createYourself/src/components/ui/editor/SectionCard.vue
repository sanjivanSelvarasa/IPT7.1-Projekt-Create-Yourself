<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    title: string,
    description: string,
    isSelected: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'pressed', title: string) : void,
  }>()

  function onPressed() {
    emit('pressed', props.title)
  }
</script>

<template>
  <button @click="onPressed()" :class="isSelected ? 'active' : '' " class="relative hover:shadow-lg hover:border-gray-300 hover:-translate-y-[2px] transition duration-150 cursor-pointer aspect-[14/9] flex flex-col items-start justify-start gap-2 select-none w-full border border-gray-200 rounded-2xl overflow-hidden px-5 py-5 bg-[var(--surface-color)]">
    <div v-if="props.isSelected" class="transition duration-75 absolute top-0 right-0 m-4">
      <SvgStruct class="w-[26px] h-[26px] rounded-full bg-[var(--secondary-color)] text-xs text-[var(--text-color-white)]">
        <i class="fa-solid fa-check"></i>
      </SvgStruct>
    </div>
    <slot name="svg"></slot>
    <div class="flex flex-col items-start justify-center gap-1">
      <span class="font-semibold">{{ props.title }}</span>
      <span class="text-[var(--text-color-light)] text-sm text-start">{{ props.description }}</span>
    </div>

    <div class="w-full h-full px-2 py-2 rounded-lg border border-gray-200 bg-gray-50">
      <slot name="visual"></slot>
    </div>
  </button>
</template>

<style scoped>
  .active{
    border-color: var(--secondary-color);
    background-color: rgba(245, 243, 255, 0.44);
  }
</style>
