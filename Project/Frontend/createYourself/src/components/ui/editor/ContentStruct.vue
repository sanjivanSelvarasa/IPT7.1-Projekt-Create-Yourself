<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tl = (key: string) => t(`editorrightside.right-Section.${key}`);
  const props = defineProps<{
    sectionVisible: boolean,
    currentPosition: number,
    totalSections: number,
  }>()

  const emit = defineEmits<{
    (e: 'sectionVisible', sectionVisible: boolean): void,
    (e: 'moveUp'): void,
    (e: 'moveDown'): void,
  }>()

  function onSectionVisible(){
    emit('sectionVisible', !props.sectionVisible)
  }

  function onMoveUp() {
    if (props.currentPosition <= 1) return
    emit('moveUp')
  }

  function onMoveDown() {
    if (props.currentPosition >= props.totalSections) return
    emit('moveDown')
  }
</script>

<template>
  <div class="w-full flex flex-col gap-5">
    <slot></slot>

    <div class="divider"></div>

    <div>
      <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Order.order') }}</span>

      <div class="flex items-center justify-between w-full mt-5">
        <span class="font-semibold">{{ tl('Order.current position') }}</span>
        <span class="uppercase font-semibold">{{ props.currentPosition }} / {{ props.totalSections }}</span>
      </div>

      <div class="flex items-center justify-center w-full gap-2 mt-5">
        <button @click="onMoveUp" :disabled="props.currentPosition <= 1"
          class="hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 flex items-center justify-center gap-2 w-full rounded-md border border-gray-200">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-angle-up"></i>
          </div>
          <span>{{ tl('Order.up') }}</span>
        </button>

        <button @click="onMoveDown" :disabled="props.currentPosition >= props.totalSections"
          class="hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-2 flex items-center justify-center gap-2 w-full rounded-md border border-gray-200">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-angle-down"></i>
          </div>
          <span>{{ tl('Order.down') }}</span>
        </button>
      </div>
    </div>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">{{ tl('Visibility.Title') }}</span>

    <div class="flex items-center justify-between w-full">
      <span class="font-semibold">{{ tl('Visibility.active') }}</span>
      <label class="switch">
        <input @click="onSectionVisible()" type="checkbox" :checked="props.sectionVisible" />
        <span class="slider round"></span>
      </label>
    </div>


  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
