<script lang="ts" setup>
  import {ref} from "vue";
  import InputStruct from "@/components/ui/editor/InputStruct.vue";

  const props = defineProps<{
    title: string,
  }>()

  const text = ref<string>('max mustermann')
</script>

<template>
  <div class="w-full flex flex-col gap-5">
    <span class="md-subtitle text-[var(--text-color-light)]">Inhalt</span>

    <InputStruct title="Überschrift">
      <input v-model="text" class="default-input w-full" type="text"/>
    </InputStruct>

    <div>
      <InputStruct title="Unterzeile">
        <textarea v-model="text" class="default-input w-full"/>
      </InputStruct>
      <span class="text-[var(--text-color-light)] text-sm font-light">108 / 240 Zeichen</span>
    </div>

    <InputStruct title="Stil">
      <select class="default-input w-full cursor-pointer outline-none">
        <option>Überschrift + Unterzeile</option>
        <option>Beispiel 1</option>
        <option>Beispiel 2</option>
      </select>
    </InputStruct>

    <InputStruct title="Ausrichtung">
      <select class="default-input w-full cursor-pointer outline-none">
        <option>Links</option>
        <option>Zentriert</option>
        <option>Rechts</option>
      </select>
    </InputStruct>

    <div class="divider"></div>

    <div>
      <span class="md-subtitle text-[var(--text-color-light)]">Reihenfolge</span>

      <div class="flex items-center justify-between w-full mt-5">
        <span class="font-semibold">Aktuelle Position</span>
        <span class="uppercase font-semibold">1 / 2</span>
      </div>

      <div class="flex items-center justify-center w-full gap-2 mt-5">
        <button class="hover:bg-gray-50 px-3 py-2 flex items-center justify-center gap-2 w-full rounded-md border border-gray-200">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-angle-up"></i>
          </div>
          <span>Nach oben</span>
        </button>

        <button class="hover:bg-gray-50 px-3 py-2 flex items-center justify-center gap-2 w-full rounded-md border border-gray-200">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-angle-down"></i>
          </div>
          <span>Nach Unten</span>
        </button>
      </div>
    </div>

    <div class="divider"></div>

    <span class="md-subtitle text-[var(--text-color-light)]">Sichtbarkeit</span>

    <div class="flex items-center justify-between w-full">
      <span class="font-semibold">Block sichtbar</span>
      <label class="switch">
        <input type="checkbox" checked>
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
