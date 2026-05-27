<script lang="ts" setup>
import SvgStruct from "@/components/ui/SvgStruct.vue";

const props = defineProps<{
  type: string,
  name: string,
  svg: string,
}>()

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

function onUp(){
  emit('up')
}

function onDown(){
  emit('down')
}

function onCopy(){
  emit('copy')
}
</script>

<template>
  <div class="group hover:bg-gray-50 hover:border-gray-200 relative select-none cursor-pointer border border-transparent rounded-xl bg-transparent px-4 py-3 w-full">
    <div class="hidden absolute top-0 right-0 -translate-y-5 mx-2 my-1 group-hover:flex items-center justify-center bg-black rounded-md text-[var(--text-color-light)] p-1 text-xs">
      <button class="hover:bg-gray-800 hover:text-gray-300 p-1.5 rounded-lg">
        <SvgStruct>
          <i class="fa-regular fa-pen-to-square"></i>
        </SvgStruct>
      </button>

      <button @click="onUp()" class="hover:bg-gray-800 hover:text-gray-300 p-1.5 rounded-lg">
        <SvgStruct>
          <i class="fa-solid fa-angle-up"></i>
        </SvgStruct>
      </button>

      <button @click="onDown()" class="hover:bg-gray-800 hover:text-gray-300 p-1.5 rounded-lg">
        <SvgStruct>
          <i class="fa-solid fa-angle-down"></i>
        </SvgStruct>
      </button>

      <div class="divider-vertical bg-gray-500! m-0! mx-1! h-[20px]!"></div>

      <button @click="onCopy()" class="hover:bg-gray-800 hover:text-gray-300 p-1.5 rounded-lg">
        <SvgStruct>
          <i class="fa-regular fa-copy"></i>
        </SvgStruct>
      </button>

      <button @click="onDelete()" class="hover:bg-red-500 hover:text-gray-200 p-1.5 rounded-lg">
        <SvgStruct>
          <i class="fa-regular fa-trash-can"></i>
        </SvgStruct>
      </button>
    </div>

    <div class="flex items-center justify-start gap-1 text-xs mb-2">
      <SvgStruct class="text-[var(--primary-color)]">
        <i :class="props.svg"></i>
      </SvgStruct>
      <p class="uppercase text-[var(--text-color-light)] font-semibold">{{ props.type }} - {{ props.name }}</p>
    </div>

    <slot></slot>
  </div>
</template>
