<script lang="ts" setup>

import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";
</script>

<template>
  <ModulStruct type="Bild" name="TEMPLATE" svg="fa-regular fa-image">
    <div class="flex items-center justify-center relative w-full rounded-lg bg-linear-to-br from-[var(--primary-color-light)] to-[var(--secondary-color-light)] min-h-[120px]">
      <div class="absolute w-full h-full bg-lines"></div>
      <div>
        <SvgStruct class="text-2xl p-3 backdrop-blur-lg text-[var(--text-color-light)] rounded-lg">
          <i class="fa-regular fa-image"></i>
        </SvgStruct>
      </div>
    </div>
  </ModulStruct>
</template>

<style scoped>
  .bg-lines{
    opacity: 0.7;
    background: #e5e5f7 repeating-linear-gradient(-45deg, #444cf7, #444cf7 0.5px, #e5e5f7 0.5px, #e5e5f7 20.5px);
  }
</style>
