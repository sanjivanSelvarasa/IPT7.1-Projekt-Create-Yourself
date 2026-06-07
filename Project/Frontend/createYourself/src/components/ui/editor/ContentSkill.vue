<script lang="ts" setup>
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import type {SkillType} from "@/types/skillType.ts";
import {ref, watch} from "vue";
import type {UpdateSkillType} from "@/types/updateSkillType.ts";

const props = defineProps<{
  skillBlock: SkillType,
}>()

const emit = defineEmits<{
  (e: 'update', skill: UpdateSkillType): void
}>()

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
  <ContentStruct>
    <span class="md-subtitle text-[var(--text-color-light)]">Skill</span>

    <InputStruct title="Name">
      <input v-model="inputName" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="Level" class="flex gap-2">
      <input @change="onUpdate()" v-model="inputLevel" type="range" class="w-full rounded-full" />
      <span>{{ inputLevel }} %</span>
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Darstellung</span>

    <InputStruct title="Aussehen">
      <select class="default-input w-full cursor-pointer outline-none">
        <option>Balken</option>
        <option>Dots</option>
      </select>
    </InputStruct>

  </ContentStruct>
</template>
