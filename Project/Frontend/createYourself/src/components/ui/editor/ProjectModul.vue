<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tl = (key: string) => t(`editorproject.${key}`);

import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
import AddButton from "@/components/ui/editor/AddButton.vue";

const emit = defineEmits<{
  (e: 'add'): void,
  (e: 'delete'): void,
  (e: 'up'): void,
  (e: 'down'): void,
}>()

function onAdd(){
  emit('add')
}

function onDelete(){
  emit('delete')
}

function onUp(){
  emit('up')
}

function onDown(){
  emit('down')
}
</script>

<template>
  <ModulStruct @delete="onDelete()" @up="onUp()" @down="onDown()" :type="tl('entry-title')" :name="`4 ${tl('entry')}`" svg="fa-solid fa-briefcase">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4">
      <slot></slot>
      <AddButton class="aspect-square" @click="onAdd()" ></AddButton>
    </div>
  </ModulStruct>
</template>
