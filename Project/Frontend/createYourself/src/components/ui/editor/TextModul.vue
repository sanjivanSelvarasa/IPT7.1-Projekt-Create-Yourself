<script lang="ts" setup>
import SvgStruct from "@/components/ui/SvgStruct.vue";
import type {TextBlockContent} from "@/types/textBlockContent.ts";
import {computed, ref} from "vue";
import ModulStruct from "@/components/ui/editor/ModulStruct.vue";

const props = defineProps<{
  textContent: TextBlockContent,
}>()

const text = ref<string>(props.textContent.text)

const tagClass = computed(() => {
  if(props.textContent.tag === null) return "";
  switch (props.textContent.tag) {
    case "h1":
      return "text-2xl"
    case "h2":
      return "text-xl"
    case "h3":
      return "text-md"
    case "p":
      return "text-sm"
    default:
      return "text-md"
  }
})

const tag = computed(() => {
  if(props.textContent.tag === null) return "";
  switch (props.textContent.tag) {
    case "h1":
      return "Haupttitel"
    case "h2":
      return "Überschrift"
    case "h3":
      return "Unterüberschrift"
    case "p":
    default:
      return "Absatz"
  }
})

const fontWeightClass = computed(() => {
  if(props.textContent.fontWeight === null) return "";
  switch (props.textContent.fontWeight) {
    case "normal":
      return "font-normal"
    case "medium":
      return "font-medium"
    case "semibold":
      return "font-semibold"
    case "bold":
      return "font-bold"
    default:
      return "font-normal"
  }
})

const emit = defineEmits<{
  (e: 'edit') : void,
  (e: 'up') : void,
  (e: 'down') : void,
  (e: 'copy') : void,
  (e: 'delete') : void,
}>()

function onDelete(){
  emit('delete')
}
</script>

<template>
  <ModulStruct @delete="onDelete()" svg="fa-solid fa-align-left" type="Text" :name="tag">
    <div :class="[tagClass, fontWeightClass]" :style="{fontSize: props.textContent.fontSize ?? 16, color: props.textContent.color, textAlign: props.textContent.align}">
      <input class="outline-gray-200! rounded-none!" :style="{textAlign: props.textContent.align}" v-model="text" type="text" placeholder="Schreib was rein ..."  />
    </div>
  </ModulStruct>
</template>
