<script lang="ts" setup>
  import type {EducationType} from "@/types/educationType.ts";
  import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
  import InputStruct from "@/components/ui/editor/InputStruct.vue";
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import {ref, watch} from "vue";

  const props = defineProps<{
    educationBlock: EducationType,
  }>()

  const inputInsitution = ref<string>(props.educationBlock.institutionName)
  const inputDegree = ref<string>(props.educationBlock.degree)

  const startDate = ref<string>(props.educationBlock.startDate)
  const endDate = ref<string>(props.educationBlock.endDate)

  watch(() => props.educationBlock, (newEducation) => {
    inputInsitution.value = newEducation.institutionName;
    inputDegree.value = newEducation.degree;
    startDate.value = newEducation.startDate;
    endDate.value = newEducation.endDate;
  })
</script>

<template>
  <ContentStruct>
    <span class="md-subtitle text-[var(--text-color-light)]">Einrichtung</span>

    <InputStruct title="Institution">
      <input v-model="inputInsitution" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="Abschluss / Fach">
      <input v-model="inputDegree" class="default-input w-full" type="text"/>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Zeitraum</span>

    <InputStruct title="Von - Bis">
      <div class="flex gap-2">
        <input v-model="startDate" class="default-input w-full" type="text"/>
        <SvgStruct>
          <i class="fa-solid fa-angle-right"></i>
        </SvgStruct>
        <input v-model="endDate" class="default-input w-full" type="text"/>
      </div>
    </InputStruct>
  </ContentStruct>
</template>
