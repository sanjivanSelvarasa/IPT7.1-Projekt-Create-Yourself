<script lang="ts" setup>

</script>

<template>
  <div class="w-full min-h-[50px] shadow-md bg-[var(--surface-color)] flex flex-col justify-center items-center gap-5 px-10 py-9 rounded-2xl border border-gray-200">
    <h1 class="text-[35px]! text-center">Interessiert an einer Zusammenarbeit?</h1>
    <span class="text-[var(--text-color-light)] max-w-[500px] text-center">Ich freue mich über neue Projekte, spannende Ideen oder einfach einen netten Austausch.</span>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
