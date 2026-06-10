<script lang="ts" setup>
  const props = defineProps<{
    imageUrl?: string,
    alt?: string,
  }>()
</script>

<template>
  <div class="px-4 py-4 shadow-md rounded-xl max-h-[350px] h-[350px] overflow-hidden border border-gray-200">
    <img
      v-if="props.imageUrl"
      :src="`http://localhost:3000${imageUrl}`"
      :alt="props.alt ?? 'Bild'"
      class="w-full h-full object-cover rounded-xl"
    />
  </div>
</template>
