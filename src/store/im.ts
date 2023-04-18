import { defineStore } from "pinia";
import { ref } from "vue";

export const useIMStore = defineStore("im", () => {
  const info = ref<Info | null>(null);

  const setInfo = (data: Info) => {
    info.value = data;
  };

  return {
    info,
    setInfo
  };
});
