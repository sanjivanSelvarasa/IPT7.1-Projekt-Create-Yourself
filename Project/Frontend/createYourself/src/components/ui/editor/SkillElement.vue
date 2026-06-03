<script lang="ts" setup>
  const props = defineProps<{
    name: string,
    level: number,
    isActive: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'selected') : void,
    (e: 'update') : void;
  }>()

  function onSelected(){
    emit("selected")
  }
</script>

<template>
  <button @click="onSelected()" class="w-full py-3 border border-dashed border-transparent rounded-lg px-2 transition duration-75" :class="props.isActive ? 'element-active' : '' ">
    <div class="flex items-center justify-between">
      <span class="font-semibold text-sm">{{name.slice(0, 30)}}</span>
      <span class="text-xs text-[var(--text-color-light)] text-nowrap">{{level}} %</span>
    </div>
    <div class="relative my-1 w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div :style="{ width:`${props.level}%`}" class="rounded-full h-full absolute bg-linear-to-r from-[var(--primary-color)] to-[var(--secondary-color)]"></div>
    </div>
  </button>
</template>
