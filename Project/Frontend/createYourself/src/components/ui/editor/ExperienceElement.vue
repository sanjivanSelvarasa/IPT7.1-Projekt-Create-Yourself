<script lang="ts" setup>
import SvgStruct from "@/components/ui/SvgStruct.vue";

const props = defineProps<{
  startDate: string,
  endDate: string,
  title: string,
  company: string,
  location?: string,
  description: string,
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
  <button
    @click="onSelected()"
    class="flex items-stretch justify-start gap-3 outline-none hover:shadow-lg hover:-translate-y-1 transition duration-100 shadow-none w-full px-4 py-3 rounded-lg border border-gray-200 bg-[var(--surface-color)]"
    :class="isActive ? 'element-active' : ''"
  >
    <div class="flex flex-col items-center">
      <div class="w-[17px] h-[17px] rounded-full border-3 border-gray-300 shrink-0"></div>
      <div class="w-[2px] flex-1 bg-gray-200"></div>
    </div>

    <div class="flex flex-col items-start justify-between gap-1">
      <span class="text-sm text-[var(--text-color-light)] font-semibold">{{ props.startDate?.slice(0, 7) ?? '' }} - {{ props.endDate?.slice(0, 7) ?? '' }}</span>
      <span class="font-semibold text-lg">{{ props.title }}</span>
      <span class="text-sm text-[var(--text-color-light)]">{{ props.company }} {{ props.location }}</span>
      <span class="text-sm">
      {{ props.description }}
      </span>
    </div>
  </button>
</template>
