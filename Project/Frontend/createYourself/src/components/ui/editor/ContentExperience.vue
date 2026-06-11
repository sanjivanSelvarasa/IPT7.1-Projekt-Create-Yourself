<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import type { ExperienceType } from "@/types/experienceType.ts";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import { ref, watch } from "vue";

const { t } = useI18n();
const tl = (key: string) => t(`editorrightsideexperience.${key}`);

const props = defineProps<{
  experienceBlock: ExperienceType,
  sectionVisible: boolean,
  currentPosition: number,
  totalSections: number,
}>()

const emit = defineEmits<{
  (e: 'update', experience: ExperienceType): void,
  (e: 'sectionVisible', sectionVisible: boolean): void,
  (e: 'moveUp'): void,
  (e: 'moveDown'): void,
}>()

const inputCompanyName = ref<string>(props.experienceBlock.companyName)
const inputPosition = ref<string>(props.experienceBlock.position)
const inputDescription = ref<string>(props.experienceBlock.description ?? "")

const startDate = ref<string>(props.experienceBlock.startDate?.slice(0, 10) ?? "")
const endDate = ref<string>(props.experienceBlock.endDate?.slice(0, 10) ?? "")

function onSectionVisible(): void {
  emit('sectionVisible', !props.sectionVisible)
}

function onMoveUp() {
  if (props.currentPosition <= 1) return
  emit('moveUp')
}

function onMoveDown() {
  if (props.currentPosition >= props.totalSections) return
  emit('moveDown')
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
  <ContentStruct @move-up="onMoveUp" @move-down="onMoveDown" :total-sections="props.totalSections" :current-position="props.currentPosition" @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title') }}</span>

    <InputStruct :title="tl('subtitle-one')">
      <input
        @change="onUpdate()"
        v-model="inputCompanyName"
        class="default-input w-full"
        type="text"
      />
    </InputStruct>

    <InputStruct :title="tl('subtitle-two')">
      <input
        @change="onUpdate()"
        v-model="inputPosition"
        class="default-input w-full"
        type="text"
      />
    </InputStruct>

    <InputStruct :title="tl('subtitle-three')">
      <textarea
        @change="onUpdate()"
        v-model="inputDescription"
        class="default-input w-full min-h-[90px] resize-none"
        :placeholder="tl('placeholder-three')"
      ></textarea>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title-two') }}</span>

    <InputStruct :title="tl('from-to')">
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
