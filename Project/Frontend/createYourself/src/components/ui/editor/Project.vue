<script lang="ts" setup>
import SvgStruct from "@/components/ui/SvgStruct.vue";

const props = defineProps<{
  title: string,
  description: string,
  codeUrl?: string,
  demoUrl?: string,
  isActive: boolean,
}>()

const emit = defineEmits<{
  (e: 'selected'): void,
}>()

function onSelected() {
  emit('selected')
}
</script>

<template>
  <button @click="onSelected()" class="hover:shadow-lg hover:-translate-y-1 transition duration-200 flex flex-col rounded-xl aspect-square overflow-hidden bg-[var(--surface-color)] border border-gray-200" :class="props.isActive ? 'element-active' : ''">
    <div class="h-full w-full bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)]"></div>

    <div class="h-fit p-4">
      <div class="flex flex-col items-start justify-center">
        <h3 class="font-bold py-1">{{ props.title }}</h3>
        <p class="text-sm text-[var(--text-color-light)]">{{ props.description }}</p>
      </div>

      <div class="divider"></div>

      <div class="flex items-center justify-start gap-2">
        <a :href="props.codeUrl" target="_blank">
          <button class="hover:border-[var(--primary-color)] hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-color)] transition duration-75 px-2 py-1 border border-gray-200 rounded-sm bg-gray-50 text-[var(--text-color-light)] flex items-center justify-center gap-1 text-sm">
            <SvgStruct>
              <i class="fa-brands fa-github"></i>
            </SvgStruct>
            <span>Code</span>
          </button>
        </a>

        <a :href="props.codeUrl" target="_blank">
          <button class="hover:border-[var(--primary-color)] hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-color)] transition duration-75 px-2 py-1 border border-gray-200 rounded-sm bg-gray-50 text-[var(--text-color-light)] flex items-center justify-center gap-1 text-sm">
            <SvgStruct>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </SvgStruct>
            <span>Demo</span>
          </button>
        </a>
      </div>
    </div>
  </button>
</template>
