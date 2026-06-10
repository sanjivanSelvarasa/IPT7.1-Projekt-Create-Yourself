<script lang="ts" setup>

</script>

<template>
  <div class="w-full h-fit min-h-[50px] px-10 py-9 rounded-xl">
    <div class="flex gap-10 justify-between items-stretch">
      <div class="w-[3px] bg-linear-to-b from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full mt-6"></div>
      <div class="w-full gap-5 flex flex-col justify-between items-start">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
