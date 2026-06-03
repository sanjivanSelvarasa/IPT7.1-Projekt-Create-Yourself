<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import type {TextBlockContent} from "@/types/textBlockContent.ts";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import type {ProjectType} from "@/types/projectType.ts";

const props = defineProps<{
  projectBlock: ProjectType,
}>()

const emit = defineEmits<{
  (e: 'update', project : ProjectType): void
}>()

function onUpdate(){
  const updatedProjectBlock : ProjectType = {
    ...props.projectBlock,
    title: inputTitle.value,
    description: inputDescription.value,
    githubUrl: inputGithubLink.value,
    projectUrl: inputDemoLink.value,

  }
  emit('update', updatedProjectBlock)
}

const inputTitle = ref<string>(props.projectBlock.title);
const inputDescription = ref<string>(props.projectBlock.description);
const inputGithubLink = ref<string>(props.projectBlock.githubUrl);
const inputDemoLink = ref<string>(props.projectBlock.projectUrl);

watch(props.projectBlock, (newProject) => {
  inputTitle.value = newProject.title;
  inputDescription.value = newProject.description;
  inputGithubLink.value = newProject.githubUrl;
  inputDemoLink.value = newProject.projectUrl;
})
</script>

<template>
  <ContentStruct>
    <span class="md-subtitle text-[var(--text-color-light)]">Projektdaten</span>

    <InputStruct title="Titel">
      <input @change="onUpdate()" v-model="inputTitle" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="Kurzbeschreibung">
      <textarea @change="onUpdate()" v-model="inputDescription" class="default-input w-full"/>
    </InputStruct>

    <InputStruct title="Projektbild">
        <input type="file" accept="image/*" class="default-input w-full cursor-pointer" @change="onUpdate()" />
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Links</span>

    <InputStruct title="Github">
      <input @change="onUpdate()" v-model="inputGithubLink" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="Demo-URL">
      <input @change="onUpdate()" v-model="inputDemoLink" class="default-input w-full" type="text"/>
    </InputStruct>

  </ContentStruct>
</template>
