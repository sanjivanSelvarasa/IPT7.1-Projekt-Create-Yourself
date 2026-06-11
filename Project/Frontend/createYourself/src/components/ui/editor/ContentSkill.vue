<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import type {SkillType} from "@/types/skillType.ts";
import {ref, watch} from "vue";
import type {UpdateSkillType} from "@/types/updateSkillType.ts";

const { t } = useI18n();
const tl = (key: string) => t(`editorrightsidaskills.${key}`);

const props = defineProps<{
  skillBlock: SkillType,
  sectionVisible: boolean,
  currentPosition: number,
  totalSections: number,
}>()

const emit = defineEmits<{
  (e: 'update', skill: UpdateSkillType): void,
  (e: 'sectionVisible', sectionVisible: boolean): void,
  (e: 'moveUp'): void,
  (e: 'moveDown'): void,
}>()

function onSectionVisible(){
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

function onUpdate() {
  const updatedSkill : UpdateSkillType = {
    id: props.skillBlock.id,
    name: inputName.value,
    level: inputLevel.value,
    sortOrder: props.skillBlock.sortOrder,
  }

  emit('update', updatedSkill)
}

const inputName = ref<string>(props.skillBlock.name)
const inputLevel = ref<number>(props.skillBlock.level)

watch(() => props.skillBlock, (newSkill) => {
    inputName.value = newSkill.name;
    inputLevel.value = newSkill.level;
  },
  {immediate: true},
)
</script>

<template>
  <ContentStruct @move-down="onMoveDown" @move-up="onMoveUp" :current-position="props.currentPosition" :total-sections="props.totalSections" @sectionVisible="onSectionVisible" :section-visible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title') }}</span>

    <InputStruct :title="tl('subtitle-one')">
      <input v-model="inputName" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct :title="tl('subtitle-two')" class="flex gap-2">
      <input @change="onUpdate()" v-model="inputLevel" type="range" class="w-full rounded-full" />
      <span>{{ inputLevel }} %</span>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title-two') }}</span>

    <InputStruct :title="tl('subtitle-three')">
      <select class="default-input w-full cursor-pointer outline-none">
        <option>{{ tl('Choice.bar') }}</option>
        <option>{{ tl('Choice.dots') }}</option>
      </select>
    </InputStruct>

  </ContentStruct>
</template>
