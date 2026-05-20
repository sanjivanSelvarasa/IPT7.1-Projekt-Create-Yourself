<script lang="ts" setup>
  const props = defineProps<{
    svg: string,
    title: string,
    count: number,
  }>()
</script>

<template>
  <div class="select-none cursor-pointer group hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-light)] rounded-lg w-full flex items-center justify-between px-1 py-2 text-[var(--text-color-light)]">
    <div class="flex justify-center items-center gap-2">
      <div class="flex items-center justify-center">
        <i :class="props.svg"></i>
      </div>
      <span>{{ props.title }}</span>
    </div>

    <div class="flex items-center justify-center w-[25px] h-[25px] text-sm rounded-full bg-gray-100 group-hover:bg-transparent">
      <span>{{ props.count }}</span>
    </div>
  </div>
</template>
