<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    svg: string,
    name: string,
    url: string,
    isActive: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'selected') : void,
  }>()

  function onSelected() {
    emit('selected')
  }
</script>

<template>
  <button @click="onSelected" class="hover:-translate-y-1 hover:shadow-lg transition duration-100 shadow-none flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 w-full rounded-lg bg-[var(--surface-color)]" :class="props.isActive ? 'element-active' : '' ">
    <SvgStruct class="text-gray-500">
      <i :class="props.svg"></i>
    </SvgStruct>
    <span class="font-semibold">{{ props.name }}</span>
    <span class="text-[var(--text-color-light)] text-sm">{{ props.url.length > 35 ? props.url.slice(0, 35) + '...' : props.url }}</span>
  </button>
</template>
