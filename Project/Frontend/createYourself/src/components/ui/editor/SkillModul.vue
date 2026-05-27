<script lang="ts" setup>
  import ModulStruct from "@/components/ui/editor/ModulStruct.vue";
</script>

<template>
  <ModulStruct type="Skills" name="Design" svg="fa-regular fa-star">
    <div class="grid grid-cols-2 gap-x-10 gap-y-2">
      <slot class="grid-cols-1"></slot>
    </div>
  </ModulStruct>
</template>
