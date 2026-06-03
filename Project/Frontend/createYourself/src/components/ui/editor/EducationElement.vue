<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    name: string,
    degree: string,
    fieldOfStudy?: string,
    startDate?: Date,
    endDate?: Date,
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
  <button @click="onSelected()" class="hover:shadow-lg hover:-translate-y-1 transition duration-100 shadow-none w-full flex items-stretch justify-between gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-[var(--surface-color)]" :class="isActive ? 'element-active' : '' ">
    <div class="flex items-center justify-between gap-2">
      <SvgStruct class="text-[var(--primary-color)] w-[40px] h-[40px] rounded-lg bg-[var(--primary-color-light)]">
        <i class="fa-solid fa-graduation-cap"></i>
      </SvgStruct>

      <div class="flex flex-col items-start justify-center gap-0.5">
        <span class="font-semibold">{{ props.name }}</span>
        <span class="text-[var(--text-color-light)] text-sm">{{ props.degree }}</span>
      </div>
    </div>

    <div v-if="startDate !== null && endDate !== null" class="flex items-start justify-center text-[var(--text-color-light)] text-sm h-full">
      <span class="h-full">{{ props.startDate?.getFullYear() }} - {{ props.endDate?.getFullYear() }}</span>
    </div>
  </button>
</template>
