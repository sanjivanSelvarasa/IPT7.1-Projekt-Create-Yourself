<script lang="ts" setup>
import Interface from "@/components/ui/Interface.vue";
import InputApp from "@/components/ui/InputApp.vue";
import {ref} from "vue";
import SvgStruct from "@/components/ui/SvgStruct.vue";

const props = defineProps<{
  id: number,
  title: string,
  description: string,
}>()

const emit = defineEmits<{
  (e: 'cancel') : void,
  (e: 'submit', id:number, title:string, description:string) : void,
}>()

function onCancel(): void {
  emit('cancel');
}

function onSubmit(): void {
  if(inputTitle.value === '' || inputTitle.value === null) {
    error.value = "Bitte gebe einen validen Titel ein";
    return;
  }

  emit('submit', props.id, inputTitle.value, inputDescription.value);
}

const inputTitle = ref(props.title)
const inputDescription = ref(props.description)

const error = ref<string>("");
</script>

<template>
  <div class="flex items-center justify-center z-9999 fixed inset-0 overflow-y-scroll overflow-x-hidden w-[100vw] h-[100vh] bg-transparent backdrop-blur-sm">
    <Interface class="max-w-[750px] overflow-hidden rounded-2xl!">
      <div class="flex flex-col gap-6 mt-3">
        <InputApp name="Portfolio-Titel * " for="title">
          <input
            v-model="inputTitle"
            class="default-input w-full"
            name="title"
            placeholder="Mein Portfolio"
          />
        </InputApp>

        <InputApp name="Beschreibung" for="description">
            <textarea
              v-model="inputDescription"
              maxlength="180"
              class="default-input w-full min-h-[100px] outline-none"
              name="description"
              placeholder="Eine kurze Beschreibung über dein Portfolio"
            ></textarea>
          <span class="text-[var(--text-color-light)] text-sm"
          >{{ description?.length ? description?.length : 0 }} / 180 Zeichen</span
          >
        </InputApp>
      </div>

      <div class="divider"></div>

      <div class="w-full flex flex-col-reverse gap-4 sm:flex-row items-center justify-between">
        <div
          class="w-full text-center flex justify-end flex-col-reverse sm:flex-row gap-2 text-nowrap"
        >
          <button @click="onCancel()" class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition duration-75 px-4 py-3 bg-[var(--surface-color)] font-semibold border border-gray-200 rounded-lg">Abbrechen</button>
          <button
            @click="onSubmit()"
            class="hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent transition duration-75 px-4 py-3 bg-[var(--primary-color)] text-[var(--text-color-white)] font-semibold border border-gray-200 rounded-lg flex gap-1 justify-center"
          >
            <span>Änderungen speichern</span>
            <SvgStruct>
              <i class="fa-solid fa-angle-right"></i>
            </SvgStruct>
          </button>
        </div>
      </div>

      <div class="text-red-500 text-sm">
        <span>{{ error }}</span>
      </div>
    </Interface>
  </div>
</template>
