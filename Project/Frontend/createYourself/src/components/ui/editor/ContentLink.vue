<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import {ref, watch} from "vue";

const { t } = useI18n();
const tl = (key: string) => t(`editorrightsidecontact.${key}`);

const props = defineProps<{
  linkBlock: SocialLinkType,
  sectionVisible: boolean,
  currentPosition: number,
  totalSections: number,
}>()

const emit = defineEmits<{
  (e: 'update', link: SocialLinkType): void,
  (e: 'sectionVisible', sectionVisible: boolean): void,
  (e: 'moveUp'): void,
  (e: 'moveDown'): void,
}>()

function onSectionVisible(){
  emit('sectionVisible', !props.sectionVisible);
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
  const updatedLink : SocialLinkType = {
    ...props.linkBlock,
    platform: inputName.value,
    url: url.value,
  }
  emit('update', updatedLink)
}

const inputName = ref<string>(props.linkBlock.platform);
const url = ref<string>(props.linkBlock.url);

watch(() => props.linkBlock, (newLink) => {
    inputName.value = newLink.platform
    url.value = newLink.url
  },
  {
    immediate: true,
  })
</script>

<template>
  <ContentStruct @move-down="onMoveDown" @move-up="onMoveUp" :current-position="props.currentPosition" :total-sections="props.totalSections" @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Title') }}</span>

    <InputStruct :title="tl('subtitle-one')">
      <input @change="onUpdate()" v-model="inputName" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct :title="tl('subtitle-two')">
      <input @change="onUpdate()" v-model="url" class="default-input w-full" type="text"/>
      <span class="text-xs text-[var(--text-color-light)]">{{ tl('info') }}</span>
    </InputStruct>

  </ContentStruct>
</template>
