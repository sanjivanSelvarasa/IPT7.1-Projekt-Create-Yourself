<script lang="ts" setup>

import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
import AddButton from "@/components/ui/editor/AddButton.vue";

const emit = defineEmits<{
  (e: 'add') : void,
  (e: 'delete'): void,
  (e: 'up'): void,
  (e: 'down'): void,
}>()

function onAdd() {
  emit('add');
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
  <ModulStruct @delete="onDelete()" @up="onUp()" @down="onDown()" type="Ausbildung" name="3 Einträge" svg="fa-solid fa-graduation-cap">
    <div class="flex flex-col gap-2">
      <slot></slot>
      <AddButton @click="onAdd()"></AddButton>
    </div>
  </ModulStruct>
</template>
