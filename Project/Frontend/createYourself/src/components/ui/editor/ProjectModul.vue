<script lang="ts" setup>

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
  <ModulStruct @delete="onDelete()" @up="onUp()" @down="onDown()" type="Projekt" name="4 Einträge" svg="fa-solid fa-briefcase">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-4">
      <slot></slot>
      <AddButton class="aspect-square" @click="onAdd()" ></AddButton>
    </div>
  </ModulStruct>
</template>
