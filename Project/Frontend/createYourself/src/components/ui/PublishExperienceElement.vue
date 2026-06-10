<script lang="ts" setup>
const props = defineProps<{
  company: string
  position: string
  description?: string
  startDate?: string
  endDate?: string | null
}>()

function formatDate(date?: string | null) {
  if (!date) return "heute"

  const year = new Date(date).getFullYear()
  return year.toString()
}
</script>

<template>
  <div class="relative hover:-translate-y-1 hover:shadow-xl transition duration-100 w-full h-fit min-h-[50px] px-10 py-7 shadow-md rounded-xl border border-gray-200 bg-[var(--surface-color)]">
    <div class="absolute top-2 -left-[66px] mx-3 mr-5 rounded-full w-[25px] h-[25px] border-3 border-[var(--primary-color)] bg-[var(--background-color)]"></div>

    <div class="flex flex-col gap-3">
      <span class="font-bold text-[var(--secondary-color)]">
        {{ formatDate(props.startDate) }} – {{ formatDate(props.endDate) }}
      </span>

      <div class="flex flex-col gap-1">
        <h3 class="text-xl font-bold text-[var(--text-color)]">
          {{ props.position }}
        </h3>

        <span class="font-semibold text-[var(--text-color-light)]">
          {{ props.company }}
        </span>
      </div>

      <p
        v-if="props.description"
        class="text-[var(--text-color-light)] leading-relaxed"
      >
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
