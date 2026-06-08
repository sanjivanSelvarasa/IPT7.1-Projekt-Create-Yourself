<script lang="ts" setup>
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import {ref, watch} from "vue";

const props = defineProps<{
  linkBlock: SocialLinkType,
  sectionVisible: boolean,
}>()

const emit = defineEmits<{
  (e: 'update', link: SocialLinkType): void
  (e: 'sectionVisible', sectionVisible: boolean): void
}>()

function onSectionVisible(){
  emit('sectionVisible', !props.sectionVisible);
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
  <ContentStruct @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">Details</span>

    <InputStruct title="Anzeige-Name">
      <input @change="onUpdate()" v-model="inputName" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="URL">
      <input @change="onUpdate()" v-model="url" class="default-input w-full" type="text"/>
      <span class="text-xs text-[var(--text-color-light)]">Öffnet im neuem Tab</span>
    </InputStruct>

  </ContentStruct>
</template>
