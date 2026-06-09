<script lang="ts" setup>
import type { ExperienceType } from "@/types/experienceType.ts";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  experienceBlock: ExperienceType,
  sectionVisible: boolean,
}>()

const emit = defineEmits<{
  (e: 'update', experience: ExperienceType): void
  (e: 'sectionVisible', sectionVisible: boolean): void
}>()

const inputCompanyName = ref<string>(props.experienceBlock.companyName)
const inputPosition = ref<string>(props.experienceBlock.position)
const inputDescription = ref<string>(props.experienceBlock.description ?? "")

const startDate = ref<string>(props.experienceBlock.startDate?.slice(0, 10) ?? "")
const endDate = ref<string>(props.experienceBlock.endDate?.slice(0, 10) ?? "")

function onSectionVisible(): void {
  emit('sectionVisible', !props.sectionVisible)
}

function onUpdate(): void {
  const updatedExperience: ExperienceType = {
    ...props.experienceBlock,
    companyName: inputCompanyName.value,
    position: inputPosition.value,
    description: inputDescription.value,
    startDate: startDate.value,
    endDate: endDate.value,
  }

  emit('update', updatedExperience)
}

watch(() => props.experienceBlock, (newExperience) => {
  inputCompanyName.value = newExperience.companyName
  inputPosition.value = newExperience.position
  inputDescription.value = newExperience.description ?? ""
  startDate.value = newExperience.startDate?.slice(0, 10) ?? ""
  endDate.value = newExperience.endDate?.slice(0, 10) ?? ""
})
</script>

<template>
  <ContentStruct @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">Berufserfahrung</span>

    <InputStruct title="Firmenname">
      <input
        @change="onUpdate()"
        v-model="inputCompanyName"
        class="default-input w-full"
        type="text"
      />
    </InputStruct>

    <InputStruct title="Position / Beruf">
      <input
        @change="onUpdate()"
        v-model="inputPosition"
        class="default-input w-full"
        type="text"
      />
    </InputStruct>

    <InputStruct title="Beschreibung">
      <textarea
        @change="onUpdate()"
        v-model="inputDescription"
        class="default-input w-full min-h-[90px] resize-none"
        placeholder="Beschreibung über den Beruf..."
      ></textarea>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Zeitraum</span>

    <InputStruct title="Von - Bis">
      <div class="flex gap-2">
        <input
          @change="onUpdate()"
          v-model="startDate"
          class="default-input w-full"
          type="text"
          placeholder="YYYY-MM-DD"
        />

        <SvgStruct>
          <i class="fa-solid fa-angle-right"></i>
        </SvgStruct>

        <input
          @change="onUpdate()"
          v-model="endDate"
          class="default-input w-full"
          type="text"
          placeholder="YYYY-MM-DD"
        />
      </div>
    </InputStruct>
  </ContentStruct>
</template>
