<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    title: string,
  }>()
</script>

<template>
  <div class="flex items-center justify-start gap-2">
    <SvgStruct class="w-[35px] h-[35px] text-[var(--primary-color)] bg-[var(--primary-color-light)] rounded-lg">
      <slot></slot>
    </SvgStruct>
    <h3 class="font-semibold">{{ props.title }}</h3>
  </div>
</template>
