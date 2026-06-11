<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tl = (key: string) => t(`editorcontact.${key}`);
</script>

<template>
  <button class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-100 outline-none px-3 py-2 bg-[var(--surface-color)] border border-dashed border-gray-500 text-gray-500 rounded-lg">
    {{ tl('add-button') }}
  </button>
</template>
