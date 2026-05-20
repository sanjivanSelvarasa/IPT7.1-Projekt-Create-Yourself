<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    name: string,
  }>()
</script>

<template>
  <div class="w-full min-h-fit rounded-2xl bg-[var(--surface-color)] border border-gray-200">
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center justify-center gap-3">
        <div class="cursor-grab flex items-center justify-center text-[var(--text-color-light)] text-xs">
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <span class="text-xs uppercase text-[var(--text-color-light)] px-2 py-1 rounded-md border border-gray-200 font-semibold bg-gray-50">{{ props.title }}</span>
        <span>{{ props.name }}</span>
      </div>
      <div class="flex items-center justify-center gap-2 text-[var(--text-color-light)]">

        <div class="bg-gray-50 flex justify-center items-center gap-1 rounded-md">
          <button class="hover:text-gray-500 flex items-center justify-center w-[27px] h-[27px] rounded-md">
            <i class="fa-solid fa-angle-up"></i>
          </button>

          <div class="divider-vertical mx-0! h-[20px]!"></div>

          <button class="hover:text-gray-500 flex items-center justify-center w-[27px] h-[27px] rounded-md">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <button class="hover:text-gray-500 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-solid fa-plus"></i>
        </button>

        <button class="hover:text-gray-500 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-regular fa-copy"></i>
        </button>

        <button class="hover:text-red-600 flex items-center justify-center w-[27px] h-[27px] rounded-md">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>

    <div class="divider mt-[0]!"></div>

    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
