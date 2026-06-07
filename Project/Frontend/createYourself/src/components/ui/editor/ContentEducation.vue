<script lang="ts" setup>
  import type {EducationType} from "@/types/educationType.ts";
  import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
  import InputStruct from "@/components/ui/editor/InputStruct.vue";
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import {ref, watch} from "vue";
  import type {SkillType} from "@/types/skillType.ts";

  const props = defineProps<{
    educationBlock: EducationType,
    sectionVisible: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'update', education: EducationType): void
    (e: 'sectionVisible', sectionVisible: boolean): void
  }>()

  function onSectionVisible(): void {
    emit('sectionVisible', !props.sectionVisible)
  }

  function onUpdate(): void {
    const updatedEducation : EducationType = {
      ...props.educationBlock,
      institutionName: inputInsitution.value,
      degree: inputDegree.value,
      startDate: startDate.value,
      endDate: endDate.value,
    }

    emit('update', updatedEducation)
  }

  const inputInsitution = ref<string>(props.educationBlock.institutionName)
  const inputDegree = ref<string>(props.educationBlock.degree)

  const startDate = ref<string>(props.educationBlock.startDate?.slice(0, 10) ?? '')
  const endDate = ref<string>(props.educationBlock.endDate?.slice(0, 10) ?? '')

  watch(() => props.educationBlock, (newEducation) => {
    inputInsitution.value = newEducation.institutionName;
    inputDegree.value = newEducation.degree;
    startDate.value = newEducation.startDate;
    endDate.value = newEducation.endDate;
  })
</script>

<template>
  <ContentStruct @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">Einrichtung</span>

    <InputStruct title="Institution">
      <input @change="onUpdate()" v-model="inputInsitution" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="Abschluss / Fach">
      <input @change="onUpdate()" v-model="inputDegree" class="default-input w-full" type="text"/>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Zeitraum</span>

    <InputStruct title="Von - Bis">
      <div class="flex gap-2">
        <input @change="onUpdate()" v-model="startDate" class="default-input w-full" type="text" placeholder="YYYY-MM-DD"/>
        <SvgStruct>
          <i class="fa-solid fa-angle-right"></i>
        </SvgStruct>
        <input @change="onUpdate()" v-model="endDate" class="default-input w-full" type="text" placeholder="YYYY-MM-DD"/>
      </div>
    </InputStruct>
  </ContentStruct>
</template>
