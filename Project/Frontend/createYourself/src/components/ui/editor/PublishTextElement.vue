<script lang="ts" setup>
  import type {TextBlockContent} from "@/types/textBlockContent.ts";

  const props = defineProps<{
    textBlock: TextBlockContent,
  }>()
</script>

<template>
  <span :style="{color: props.textBlock.color, textAlign: props.textBlock.align, fontSize: props.textBlock.fontSize, fontWeight: props.textBlock.fontWeight}">{{ props.textBlock.text }}</span>
</template>
