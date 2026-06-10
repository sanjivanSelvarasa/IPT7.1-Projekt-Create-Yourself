<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
  import InputStruct from "@/components/ui/editor/InputStruct.vue";
  import type {TextBlockContent} from "@/types/textBlockContent.ts";
  import ContentStruct from "@/components/ui/editor/ContentStruct.vue";
import {parse} from "vite";

  const props = defineProps<{
    textBlock: TextBlockContent,
    sectionVisible: boolean,
    currentPosition: number,
    totalSections: number,
  }>()

  const emit = defineEmits<{
    (e: 'update', updated: TextBlockContent) : void,
    (e: 'sectionVisible', sectionVisible: boolean): void,
    (e: 'moveUp'): void,
    (e: 'moveDown'): void,
  }>()

  function onSectionVisible(sectionVisible: boolean){
    emit('sectionVisible', sectionVisible)
  }

  function onMoveUp() {
    emit('moveUp')
  }

  function onMoveDown() {
    emit('moveDown')
  }

  function onUpdate() {
    const updatedTextBlock : TextBlockContent = {
      id: props.textBlock.id,
      text: inputText.value,
      tag: inputTag.value,
      align: inputAlign.value,
      fontSize: inputSize.value,
      fontWeight: inputWeight.value,
      color: inputColor.value,
    }

    emit('update', updatedTextBlock)
  }

  const inputText = ref<string>(props.textBlock.text)
  const inputColor = ref<string>(props.textBlock.color ?? '')
  const inputTag = ref<NonNullable<TextBlockContent['tag']>>(props.textBlock.tag ?? 'p')
  const inputAlign = ref<NonNullable<TextBlockContent['align']>>(props.textBlock.align ?? 'left')
  const inputSize = ref<number>(props.textBlock.fontSize ?? 12)
  const inputWeight = ref<NonNullable<TextBlockContent['fontWeight']>>(props.textBlock.fontWeight ?? 'normal')

  watch(() => props.textBlock, (newTextBlock) => {
    inputText.value = newTextBlock.text;
    inputTag.value = newTextBlock.tag ?? 'p';
    inputAlign.value = newTextBlock.align ?? 'left';
    inputSize.value = newTextBlock.fontSize ?? 12;
    inputWeight.value = newTextBlock.fontWeight ?? 'normal';
    inputColor.value = newTextBlock.color ?? ''
  })

  const sizes = [
    { label: "9 px", value: 9 },
    { label: "10 px", value: 10 },
    { label: "11 px", value: 11 },
    { label: "12 px", value: 12 },
    { label: "14 px", value: 14 },
    { label: "16 px", value: 16 },
    { label: "18 px", value: 18 },
    { label: "20 px", value: 20 },
    { label: "24 px", value: 24 },
    { label: "28 px", value: 28 },
    { label: "32 px", value: 32 },
    { label: "36 px", value: 36 },
    { label: "40 px", value: 40 },
    { label: "48 px", value: 48 },
    { label: "56 px", value: 56 },
    { label: "64 px", value: 64 },
  ]
</script>

<template>
  <ContentStruct @move-down="onMoveDown" @move-up="onMoveUp" :current-position="props.currentPosition" :total-sections="props.totalSections" :section-visible="props.sectionVisible" @sectionVisible="onSectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">Inhalt</span>

    <div>
      <InputStruct title="Text">
        <textarea maxlength="500" @change="onUpdate()" v-model="inputText" class="default-input w-full"/>
      </InputStruct>
      <span class="text-[var(--text-color-light)] text-sm font-light">{{ inputText.length }} / 500 Zeichen</span>
    </div>

    <InputStruct title="Tag">
      <select @change="onUpdate()" v-model="inputTag" class="default-input w-full">
        <option value="p">Paragraph</option>
        <option value="h1">Titel</option>
        <option value="h2">Untertitel</option>
        <option value="h3">Überschrift</option>
      </select>
    </InputStruct>

    <InputStruct title="Farbe">
      <input @change="onUpdate()" v-model="inputColor" type="color" class="w-full outline-none">
    </InputStruct>

    <InputStruct title="Grösse">
      <select @change="onUpdate()" v-model.number="inputSize" class="default-input w-full">
        <option v-for="size in sizes" :key="size.value" :value="size.value">
          {{ size.label }}
        </option>
      </select>
    </InputStruct>

    <InputStruct title="Weight">
      <select @change="onUpdate()" v-model="inputWeight" class="default-input w-full">
        <option value="normal">Normal</option>
        <option value="medium">Medium</option>
        <option value="semibold">Semibold</option>
        <option value="bold">Bold</option>
      </select>
    </InputStruct>

<!--    <InputStruct title="Stil">-->
<!--      <select class="default-input w-full cursor-pointer outline-none">-->
<!--        <option>Überschrift + Unterzeile</option>-->
<!--      </select>-->
<!--    </InputStruct>-->

    <InputStruct title="Ausrichtung">
      <select @change="onUpdate()" v-model="inputAlign" class="default-input w-full cursor-pointer outline-none">
        <option value="left">Links</option>
        <option value="center">Zentriert</option>
        <option value="right">Rechts</option>
      </select>
    </InputStruct>
  </ContentStruct>
</template>
