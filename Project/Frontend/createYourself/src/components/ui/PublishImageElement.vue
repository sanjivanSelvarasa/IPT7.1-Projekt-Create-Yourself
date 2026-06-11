<script lang="ts" setup>
  import {computed} from "vue";

  const props = defineProps<{
    imageUrl?: string,
    alt?: string,
  }>()

  const apiUrl = import.meta.env.VITE_API_URL
  const imageSrc = computed(() => {
    if (!props.imageUrl) return ''

    if (props.imageUrl.startsWith('http')) {
      return props.imageUrl
    }

    return `${apiUrl}${props.imageUrl}`
  })
</script>

<template>
  <div class="px-4 py-4 shadow-md rounded-xl max-h-[350px] h-[350px] overflow-hidden border border-gray-200">
    <img
      v-if="props.imageUrl"
      :src="imageSrc"
      :alt="props.alt ?? 'Bild'"
      class="w-full h-full object-cover rounded-xl"
    />
  </div>
</template>
