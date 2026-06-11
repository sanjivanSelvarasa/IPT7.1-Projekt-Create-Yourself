<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import {onMounted, ref, watch} from "vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import type {TextBlockContent} from "@/types/textBlockContent.ts";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import type {ProjectType} from "@/types/projectType.ts";

const { t } = useI18n();
const tl = (key: string) => t(`editorrightsideprojects.${key}`);

const props = defineProps<{
  projectBlock: ProjectType,
  sectionVisible: boolean,
}>()

const emit = defineEmits<{
  (e: 'update', project : ProjectType): void
  (e: 'setImage', file: File): void
  (e: 'sectionVisible', sectionVisible: boolean): void
}>()

function onsectionVisible(){
  emit('sectionVisible', !props.sectionVisible);
}

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
const imageUrl = ref<string>(props.projectBlock.imageUrl ?? '');

watch(props.projectBlock, (newProject) => {
  inputTitle.value = newProject.title;
  inputDescription.value = newProject.description;
  inputGithubLink.value = newProject.githubUrl;
  inputDemoLink.value = newProject.projectUrl;
})

function onSetImage(event: Event){
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0]

  if(!file) return

  emit("setImage", file)
}
</script>

<template>
  <ContentStruct @sectionVisible="onsectionVisible" :section-visible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title-one') }}</span>

    <InputStruct :title="tl('subtitle-one')">
      <input @change="onUpdate()" v-model="inputTitle" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct :title="tl('subtitle-two')">
      <textarea @change="onUpdate()" v-model="inputDescription" class="default-input w-full"/>
    </InputStruct>

    <InputStruct :title="tl('subtitle-three')">
        <input type="file" accept="image/*" class="default-input w-full cursor-pointer" @change="onSetImage" />
    </InputStruct>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title-two') }}</span>

    <InputStruct :title="tl('Github')">
      <input @change="onUpdate()" v-model="inputGithubLink" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct :title="tl('Demo')">
      <input @change="onUpdate()" v-model="inputDemoLink" class="default-input w-full" type="text"/>
    </InputStruct>

  </ContentStruct>
</template>
