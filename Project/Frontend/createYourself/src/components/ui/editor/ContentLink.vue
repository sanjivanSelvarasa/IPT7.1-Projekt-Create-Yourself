<script lang="ts" setup>
import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import type {SocialLinkType} from "@/types/SocialLinkType.ts";
import SvgStruct from "@/components/ui/SvgStruct.vue";
import InputStruct from "@/components/ui/editor/InputStruct.vue";
import {ref, watch} from "vue";

const props = defineProps<{
  linkBlock: SocialLinkType,
}>()

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
  <ContentStruct>
    <span class="md-subtitle text-[var(--text-color-light)]">Platform</span>

    <div class="grid grid-cols-6 w-full h-fit bg-gray-50 border border-gray-300 rounded-lg">
      <SvgStruct v-for="i in 10" class="min-h-[50px] text-[var(--text-color-light)]">
        <i class="fa-brands fa-github"></i>
      </SvgStruct>
    </div>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Details</span>

    <InputStruct title="Anzeige-Name">
      <input v-model="inputName" class="default-input w-full" type="text"/>
    </InputStruct>

    <InputStruct title="URL">
      <input v-model="url" class="default-input w-full" type="text"/>
      <span class="text-xs text-[var(--text-color-light)]">Öffnet im neuem Tab</span>
    </InputStruct>

  </ContentStruct>
</template>
