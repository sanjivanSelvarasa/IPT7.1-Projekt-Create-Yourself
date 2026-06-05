<script lang="ts" setup>
  const props = defineProps<{
    svg: string,
    title: string,
    active: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'clicked') : void,
  }>()

  function onClick(){
    emit('clicked')
  }
</script>

<template>
  <button @click="onClick()" :class="props.active ? 'active' : '' " class="hover:bg-gray-50 flex justify-center items-center gap-2 px-2 py-1 rounded-md m-1">
    <div class="flex justify-center items-center">
      <i :class="props.svg"></i>
    </div>
    <span>{{ props.title }}</span>
  </button>
</template>

<style scoped>
  .active{
    background-color: var(--text-color);
    color: var(--text-color-white);
  }
</style>
