<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    institutionName: string,
    degree: string,
    startDate: Date,
    endDate: Date,
  }>()
</script>

<template>
  <div class="flex gap-8 w-full min-h-[50px] bg-linear-to-r from-indigo-950 to-indigo-900 rounded-3xl px-10 py-9">
    <SvgStruct class="text-[var(--text-color-white)] text-2xl rounded-xl border border-gray-500 bg-blur backdrop-blur-sm w-[75px] h-[75px]">
      <i class="fa-solid fa-graduation-cap"></i>
    </SvgStruct>

    <div class="flex gap-1 flex-col text-[var(--text-color-white)]">
      <span v-if="startDate && endDate" class="text-sm text-indigo-300 font-bold">{{ props.startDate?.toString().slice(0, 7) }} - {{ props.endDate?.toString().slice(0, 7) }}</span>

      <h2 class="text-2xl!">{{ props.institutionName }}</h2>

      <span class="font-semibold text-sm text-[var(--text-color-light)]">{{ props.degree }}</span>
    </div>
  </div>
</template>

<style scoped>
  .bg-blur{
    background: rgba(106, 114, 130, 0.4);
  }
</style>
