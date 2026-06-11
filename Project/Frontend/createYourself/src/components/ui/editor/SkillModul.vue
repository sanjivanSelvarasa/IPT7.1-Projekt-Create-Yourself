<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tl = (key: string) => t(`editorskills.${key}`);
  import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
  import AddButton from "@/components/ui/editor/AddButton.vue";

  const emit = defineEmits<{
    (e: 'add'): void,
    (e: 'delete'): void,
    (e: 'up'): void,
    (e: 'down'): void,
  }>()

  function onAdd() {
    emit('add')
  }

  function onDelete() {
    emit('delete')
  }

  function up(){
    emit('up')
  }

  function down(){
    emit('down')
  }
</script>

<template>
  <ModulStruct @delete="onDelete()" @up="up()" @down="down()" :type="tl('entry-title')" :name="tl('entry')" svg="fa-regular fa-star">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-x-10 gap-y-2">
      <slot></slot>
      <AddButton @click="onAdd()"></AddButton>
    </div>
  </ModulStruct>
</template>
