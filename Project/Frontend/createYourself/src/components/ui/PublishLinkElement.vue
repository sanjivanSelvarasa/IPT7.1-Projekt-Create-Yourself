<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    svg: string,
    name: string,
    url: string,
  }>()
</script>

<template>
  <button class="hover:shadow-md hover:-translate-y-1 transition duration-150 shadow-none px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg text-sm font-semibold">
    <a :href="props.url" target="_blank" class="flex items-center justify-center gap-3">
      <SvgStruct class="text-[var(--primary-color)]">
        <i :class="props.svg"></i>
      </SvgStruct>
      {{ props.name }}
    </a>
  </button>
</template>
