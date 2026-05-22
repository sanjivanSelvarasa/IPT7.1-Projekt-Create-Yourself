<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";

  const props = defineProps<{
    title: string,
    isDone: boolean,
  }>()
</script>

<template>
  <li class="w-full flex items-center justify-between gap-2 border border-transparent border-b-gray-200 py-4">
    <div class="flex items-center justify-start gap-3 text-sm">
      <SvgStruct v-if="isDone" class="text-xs w-[27px] h-[27px] rounded-full bg-green-50 border border-green-500 text-green-500">
        <i class="fa-solid fa-check"></i>
      </SvgStruct>

      <SvgStruct v-if="!isDone" class="text-xs w-[27px] h-[27px] rounded-full bg-red-50 border border-red-500 text-red-500">
        <i class="fa-solid fa-x"></i>
      </SvgStruct>
      <span class="font-semibold">{{ props.title }}</span>
    </div>
    <span v-if="isDone" class="text-green-600 text-sm font-semibold">Erledigt</span>

    <span v-if="!isDone" class="text-red-600 text-sm font-semibold">Fehlt</span>
  </li>
</template>
