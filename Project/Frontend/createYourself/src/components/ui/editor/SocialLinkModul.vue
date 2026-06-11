<script lang="ts" setup>
import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
import AddButton from "@/components/ui/editor/AddButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tl = (key: string) => t(`editorcontact.${key}`);

const emit = defineEmits<{
  (e: 'add') : void,
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
  <ModulStruct
    @delete="onDelete()"
    @up="onUp()"
    @down="onDown()"
    :type="tl('entry-title')"
    :name="tl('entry')"
    svg="fa-solid fa-link"
  >
    <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2">
      <slot></slot>
      <AddButton @click="onAdd()"></AddButton>
    </div>
  </ModulStruct>
</template>