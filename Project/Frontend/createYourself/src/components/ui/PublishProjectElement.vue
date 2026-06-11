<script lang="ts" setup>
  import SvgStruct from "@/components/ui/SvgStruct.vue";
  import {computed} from "vue";

  const props = defineProps<{
    title: string,
    description: string,
    demoUrl: string,
    codeUrl: string,
    image: string,
  }>()

  const apiUrl = import.meta.env.VITE_API_URL
  const imageSrc = computed(() => {
    if (!props.image) return ''

    if (props.image.startsWith('http')) {
      return props.image
    }

    return `${apiUrl}${props.image}`
  })
</script>

<template>
  <div class="w-full h-full overflow-hidden bg-[var(--surface-color)] border-2 border-gray-200 shadow-md rounded-xl">
    <div v-if="!image" class="w-full h-[175px] bg-linear-to-br from-[var(--primary-color)] to-[var(--secondary-color)]"></div>
    <img v-else :src="imageSrc" class="w-full h-[175px] object-cover">
    <div class="flex flex-col items-start justify-center gap-3 p-6">
      <span class="font-semibold text-xl">{{ props.title }}</span>
      <span class="text-[var(--text-color-light)] text-sm min-h-[150px] overflow-y-hidden">{{ props.description }}</span>

      <div class="w-full flex gap-3">
        <button class="hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] hover:bg-[var(--surface-color)] transition duration-75 font-semibold border-2 border-transparent flex gap-2 justify-center items-center shadow-md w-full px-4 py-3 text-[var(--text-color-white)] rounded-2xl bg-[var(--primary-color)]">
          <SvgStruct>
            <i class="fa-solid fa-link"></i>
          </SvgStruct>
          <span>Demo</span>
        </button>

        <button class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 flex gap-2 justify-center items-center shadow-md w-full px-4 py-3 text-[var(--text-color)] rounded-2xl font-semibold bg-[var(--surface-color)] border-2 border-gray-200">
          <SvgStruct>
            <i class="fa-solid fa-code"></i>
          </SvgStruct>
          <span>Code</span>
        </button>
      </div>
    </div>
  </div>
</template>
