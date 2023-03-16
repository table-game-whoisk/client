import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const messageList = ref<Message[]>([]);
  const character = ref<any[]>([]);
  const gameStep = ref<Game.GameStep>("start");

  const setMessageList = (data: Message[]) => {
    messageList.value = data;
  };

  const setCharacter = (data: any[]) => {
    if (gameStep.value === "start") {
      gameStep.value = "character";
    }
    character.value = data;
  };

  return {
    messageList,
    character,
    gameStep,
    setMessageList,
    setCharacter
  };
});
