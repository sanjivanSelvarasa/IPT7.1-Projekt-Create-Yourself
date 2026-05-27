<script lang="ts" setup>

import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
</script>

<template>
  <ModulStruct type="Projekt" name="4 Einträge" svg="fa-solid fa-briefcase">
    <div class="grid grid-cols-3 gap-4">
      <slot class="grid-cols-1"></slot>
    </div>
  </ModulStruct>
</template>
