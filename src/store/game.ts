import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const messageList = ref<Message[]>([]);

  const setMessageList = (data: Message[]) => {
    messageList.value = data;
  };

  return {
    messageList,
    setMessageList
  };
});
