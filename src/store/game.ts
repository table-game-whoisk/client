import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const messageList = ref<Message[]>([]);
  const characterList = ref<Game.CharacterProp[]>([]);
  const playerInfo = ref<PlayerInfo | null>(null);
  const gameStep = ref<Game.gameStep>("start");

  const setMessageList = (data: Message[]) => {
    messageList.value = data;
  };

  const setPlayerInfo = (data: PlayerInfo) => {
    playerInfo.value = data;
  };

  const setCharacter = (data: any[]) => {
    if (gameStep.value === "start") {
      gameStep.value = "character";
    }
    characterList.value = data;
  };

  return {
    playerInfo,
    messageList,
    characterList,
    gameStep,
    setPlayerInfo,
    setMessageList,
    setCharacter
  };
});
