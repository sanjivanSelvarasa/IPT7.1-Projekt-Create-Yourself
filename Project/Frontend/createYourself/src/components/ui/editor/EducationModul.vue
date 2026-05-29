<script lang="ts" setup>

import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
</script>

<template>
  <ModulStruct type="Ausbildung" name="3 Einträge" svg="fa-solid fa-graduation-cap">
    <div class="flex flex-col gap-2">
      <slot></slot>
    </div>
  </ModulStruct>
</template>
