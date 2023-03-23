import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const messageList = ref<Message[]>([]);
  const characterList = ref<Game.CharacterProp[]>([]);
  const playerInfo = ref<PlayerInfo | null>(null);
  const gameStep = ref<Game.gameStep>("start");
  const currRoundPlayer = ref<PlayerInfo | null>(null);

  const setMessageList = (data: Message[]) => {
    messageList.value = data;
  };

  const setGameStep = (gamestep: Game.gameStep) => {
    gameStep.value = gamestep;
  };

  const setPlayerInfo = (data: PlayerInfo) => {
    playerInfo.value = data;
  };

  const setCharacter = (data: Game.CharacterProp[]) => {
    if (gameStep.value === "start") {
      gameStep.value = "character";
    }
    characterList.value = data;
  };

  const setCurrRoundPlayer = (data: PlayerInfo) => {
    currRoundPlayer.value = data;
  };

  return {
    playerInfo,
    messageList,
    characterList,
    gameStep,
    currRoundPlayer,
    setCurrRoundPlayer,
    setGameStep,
    setPlayerInfo,
    setMessageList,
    setCharacter
  };
});
