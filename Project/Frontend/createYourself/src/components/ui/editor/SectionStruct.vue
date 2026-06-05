<script lang="ts" setup>
  import {ref} from "vue";

  const props = defineProps<{
    title: string,
    name: string,
    isSelected: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'delete') : void
    (e: 'selected') : void
    (e: 'update', title: string) : void
    (e: 'up') : void
    (e: 'down') : void
    (e: 'add') : void
  }>()

  function onDelete(){
    emit('delete')
  }

  function onSelected(){
    emit('selected')
  }

  function onUpdate(){
    emit('update', title.value)
  }

  function onUp(){
    emit('up')
  }

  function onDown(){
    emit('down')
  }

  function onAdd(){
    emit('add')
  }

  const title = ref<string>(props.title)
</script>

<template>
  <div @click="onSelected" :class="isSelected ? 'active' : '' " class="transition duration-75 w-full min-h-fit rounded-2xl bg-[var(--surface-color)] border border-gray-200">
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center justify-center gap-3">
        <div class="cursor-grab flex items-center justify-center text-[var(--text-color-light)] text-xs">
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <span class="select-none text-xs uppercase text-[var(--text-color-light)] px-2 py-1 rounded-md border border-gray-200 font-semibold bg-gray-50">{{ props.name }}</span>
        <input @change="onUpdate()" v-model="title" type="text" class="hover:bg-gray-50 transition duration-100 rounded-sm! px-2 py-1">
      </div>
      <div class="flex items-center justify-center gap-2 text-[var(--text-color-light)]">

        <div class="bg-gray-50 flex justify-center items-center gap-1 rounded-md">
          <button @click="onUp()" class="hover:text-gray-500 hover:bg-gray-100 transition duration-100 flex items-center justify-center w-[27px] h-[27px] rounded-md">
            <i class="fa-solid fa-angle-up"></i>
          </button>

          <div class="divider-vertical mx-0! h-[20px]!"></div>

          <button @click="onDown()" class="hover:text-gray-500 hover:bg-gray-100 transition duration-100 flex items-center justify-center w-[27px] h-[27px] rounded-md">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <button @click="onAdd()" class="hover:text-gray-500 hover:bg-gray-100 transition duration-100 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-solid fa-plus"></i>
        </button>

        <button class="hover:text-gray-500 hover:bg-gray-100 transition duration-100 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-regular fa-copy"></i>
        </button>

        <button @click="onDelete" class="hover:text-red-600 transition duration-100 hover:bg-red-100 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>

    <div class="divider mt-[0]!"></div>

    <div class="p-4 pt-0">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .active{
    border-color: var(--primary-color);
  }
</style>
