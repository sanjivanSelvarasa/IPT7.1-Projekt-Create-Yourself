<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
  import InputStruct from "@/components/ui/editor/InputStruct.vue";
  import type {TextBlockContent} from "@/types/textBlockContent.ts";
  import ContentStruct from "@/components/ui/editor/ContentStruct.vue";

  const props = defineProps<{
    textBlock: TextBlockContent,
  }>()

  const inputText = ref<string>(props.textBlock.text)
  const inputTag = ref<string>(props.textBlock.tag ?? 'p')
  const inputAlign = ref<string>(props.textBlock.align ?? 'left')
  const inputSize = ref<number>(props.textBlock.fontSize ?? 12)
  const inputWeight = ref<string>(props.textBlock.fontWeight ?? 'normal')

  watch(() => props.textBlock, (newTextBlock) => {
    inputText.value = newTextBlock.text;
    inputTag.value = newTextBlock.tag ?? 'p';
    inputAlign.value = newTextBlock.align ?? 'left';
    inputSize.value = newTextBlock.fontSize ?? 12;
    inputWeight.value = newTextBlock.fontWeight ?? 'normal';
  })
  const sizes = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ]
</script>

<template>
  <ContentStruct>
    <span class="md-subtitle text-[var(--text-color-light)]">Inhalt</span>

<!--    <InputStruct title="Text">-->
<!--      <input v-model="text" class="default-input w-full" type="text"/>-->
<!--    </InputStruct>-->

    <div>
      <InputStruct title="Text">
        <textarea v-model="inputText" class="default-input w-full"/>
      </InputStruct>
      <span class="text-[var(--text-color-light)] text-sm font-light">108 / 500 Zeichen</span>
    </div>

    <InputStruct title="Tag">
      <select v-model="inputTag" class="default-input w-full">
        <option value="p">Paragraph</option>
        <option value="h1">Titel</option>
        <option value="h2">Untertitel</option>
        <option value="h3">Überschrift</option>
      </select>
    </InputStruct>

    <InputStruct title="Grösse">
      <select v-model="inputSize" class="default-input w-full">
        <option v-for="size in sizes" :value="size">{{ size }}</option>
      </select>
    </InputStruct>

    <InputStruct title="Weight">
      <select v-model="inputWeight" class="default-input w-full">
        <option value="normal">Normal</option>
        <option value="medium">Medium</option>
        <option value="semibold">Semibold</option>
        <option value="bold">Bold</option>
      </select>
    </InputStruct>

    <InputStruct title="Stil">
      <select class="default-input w-full cursor-pointer outline-none">
        <option>Überschrift + Unterzeile</option>
        <option>Beispiel 1</option>
        <option>Beispiel 2</option>
      </select>
    </InputStruct>

    <InputStruct title="Ausrichtung">
      <select v-model="inputAlign" class="default-input w-full cursor-pointer outline-none">
        <option value="left">Links</option>
        <option value="center">Zentriert</option>
        <option value="right">Rechts</option>
      </select>
    </InputStruct>
  </ContentStruct>
</template>
