<script lang="ts" setup>
import { ref, watch } from "vue"
import ContentStruct from "@/components/ui/editor/ContentStruct.vue"
import InputStruct from "@/components/ui/editor/InputStruct.vue"
import SvgStruct from "@/components/ui/SvgStruct.vue"

type ImageBlockContent = {
  imageUrl: string
  alt?: string
}

const props = defineProps<{
  imageBlock: ImageBlockContent
  sectionVisible: boolean
  currentPosition: number
  totalSections: number
}>()

const emit = defineEmits<{
  (e: "update", imageBlock: ImageBlockContent): void
  (e: "setImage", file: File): void
  (e: "sectionVisible", sectionVisible: boolean): void
  (e: "moveUp"): void
  (e: "moveDown"): void
}>()

const inputAlt = ref<string>(props.imageBlock.alt ?? "")

function onSectionVisible(): void {
  emit("sectionVisible", !props.sectionVisible)
}

function onMoveUp() {
  if (props.currentPosition <= 1) return
  emit("moveUp")
}

function onMoveDown() {
  if (props.currentPosition >= props.totalSections) return
  emit("moveDown")
}

function onUpdate(): void {
  emit("update", {
    ...props.imageBlock,
    alt: inputAlt.value,
  })
}

function onImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  emit("setImage", file)
  input.value = ""
}

watch(() => props.imageBlock, (newImageBlock) => {
  inputAlt.value = newImageBlock.alt ?? ""
})
</script>

<template>
  <ContentStruct @move-up="onMoveUp" @move-down="onMoveDown" :total-sections="props.totalSections" :current-position="props.currentPosition" @sectionVisible="onSectionVisible" :sectionVisible="props.sectionVisible">
    <span class="md-subtitle text-[var(--text-color-light)]">Bild</span>

    <div class="w-full rounded-xl overflow-hidden border border-gray-200 bg-[var(--background-color)]">
      <img v-if="props.imageBlock.imageUrl"
        :src="`http://localhost:3000${props.imageBlock.imageUrl}`"
        :alt="props.imageBlock.alt ?? 'Bild'"
        class="w-full max-h-[220px] object-cover" />

      <div v-else class="w-full h-[160px] flex flex-col items-center justify-center gap-3 text-[var(--text-color-light)]">
        <SvgStruct class="text-3xl">
          <i class="fa-regular fa-image"></i>
        </SvgStruct>
        <span class="text-sm">Kein Bild hochgeladen</span>
      </div>
    </div>

    <InputStruct title="Bild hochladen">
      <label class="default-input w-full cursor-pointer flex items-center justify-center gap-2">
        <input type="file" accept="image/*" class="hidden" @change="onImageChange"/>

        <SvgStruct>
          <i class="fa-regular fa-image"></i>
        </SvgStruct>

        <span>Bild auswählen</span>
      </label>
    </InputStruct>

    <InputStruct title="Alt Text">
      <input @change="onUpdate" v-model="inputAlt" class="default-input w-full" type="text" placeholder="Beschreibung des Bildes"/>
    </InputStruct>
  </ContentStruct>
</template>
