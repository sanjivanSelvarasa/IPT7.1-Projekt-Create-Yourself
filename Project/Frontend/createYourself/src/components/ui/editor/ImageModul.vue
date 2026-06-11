<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import ModulStruct from "@/components/ui/editor/ModulStruct.vue"
import SvgStruct from "@/components/ui/SvgStruct.vue"

const { t } = useI18n();
const tl = (key: string) => t(`editor.${key}`);

const props = defineProps<{
  imageContent: {
    imageUrl: string
    alt?: string
  }
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: "selected"): void
  (e: "delete"): void
  (e: "up"): void
  (e: "down"): void
}>()

function onSelected() {
  emit("selected")
}

function onDelete() {
  emit("delete")
}

function onUp() {
  emit("up")
}

function onDown() {
  emit("down")
}
</script>

<template>
  <ModulStruct @click="onSelected" @delete="onDelete" @up="onUp" @down="onDown" :type="tl('defaults.image-alt')" :name="props.imageContent.alt ?? tl('defaults.image-alt')" svg="fa-regular fa-image" :class="props.isActive ? 'element-active' : ''">
    <div class="flex items-center justify-center relative w-full rounded-lg overflow-hidden bg-linear-to-br from-[var(--primary-color-light)] to-[var(--secondary-color-light)] min-h-[120px]">
      <img v-if="props.imageContent.imageUrl" :src="`http://localhost:3000${props.imageContent.imageUrl}`" :alt="props.imageContent.alt ?? tl('defaults.image-alt')" class="w-full max-h-[250px] object-cover"/>
      <template v-else>
        <div class="absolute w-full h-full bg-lines"></div>

        <div class="relative z-10">
          <SvgStruct class="text-2xl p-3 backdrop-blur-lg text-[var(--text-color-light)] rounded-lg bg-white/40">
            <i class="fa-regular fa-image"></i>
          </SvgStruct>
        </div>
      </template>
    </div>
  </ModulStruct>
</template>

<style scoped>
.bg-lines {
  opacity: 0.7;
  background: #e5e5f7 repeating-linear-gradient(
    -45deg,
    #444cf7,
    #444cf7 0.5px,
    #e5e5f7 0.5px,
    #e5e5f7 20.5px
  );
}
</style>
