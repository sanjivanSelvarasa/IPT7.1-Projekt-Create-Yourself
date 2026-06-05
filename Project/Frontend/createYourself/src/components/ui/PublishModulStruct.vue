<script lang="ts" setup>
import SvgStruct from "@/components/ui/SvgStruct.vue";

const props = defineProps<{
  name: string,
  title: string,
  description: string,
}>()
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-2 w-full">
      <div class="flex justify-start gap-2 text-[var(--primary-color)] uppercase text-base">
        <SvgStruct>
          <i class="fa-solid fa-grip-lines"></i>
        </SvgStruct>
        <span>{{ props.name }}</span>
      </div>

      <h2 class="text-[40px]!">{{ props.title }}</h2>

      <span class="text-[var(--text-color-light)] text-base max-w-[450px]">{{ props.description }}</span>
    </div>
    <div class="mt-10">
      <slot></slot>
    </div>
  </div>
</template>
