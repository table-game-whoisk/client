import { useGameStore } from "@/store/game";
import { ref, watch } from "vue";

export const useScoket = () => {
  const socket = ref<UniApp.SocketTask | null>(null);
  const info = ref<Info | null>(null);
  const timer = ref<NodeJS.Timer | null>(null);
  const user = ref<{ id: string } | null>(null);
  const game = useGameStore();

  const heartBeat = () => {
    timer.value = setInterval(() => {
      uni.sendSocketMessage({
        data: "ping",
        success() {},
        fail() {
          timer.value && clearInterval(timer.value);
          timer.value = null;
          user.value && connect(user.value);
        }
      });
    }, 3000);
  };

  const connect = (data: { id: string }) => {
    const { id } = data;
    user.value = data;
    socket.value = uni.connectSocket({
      url: `${import.meta.env.VITE_SOCKET_PORT}?userId=${id}`,
      success() {
        console.log("connect success");
        heartBeat();
      },
      fail() {
        console.log("connect fail");
      }
    });
  };

  const disConnect = (userId: string) => {
    socket.value = null;
    timer.value && clearInterval(timer.value);
    timer.value = null;
    uni.closeSocket({ success() {}, fail() {} });
  };

  const send = (data: MessageData) => {
    uni.sendSocketMessage({
      data: JSON.stringify(data),
      success() {
        console.log("send success");
      },
      fail() {
        console.log("send error");
      }
    });
  };

  const dispatchMessage = (message: MessageData) => {
    const { type, player, room, msg, messages, content } = message;
    switch (type) {
      case "info":
        info.value = { player: player || null, room: room || null };
        player && game.setPlayerInfo(player);
        room?.gameStep && game.setGameStep(room.gameStep);
        break;
      case "message":
        game.setMessageList(messages || []);
        break;
      case "character":
        game.setCharacter(content.characterList);
        break;
      case "round":
        game.setGameStep("round");
        content && game.setCurrRoundPlayer(content);
        break;
      case "error":
        uni.showToast({
          title: msg,
          icon: "error"
        });
        break;
    }
    return;
  };

  uni.onSocketMessage(function (res) {
    if (res.data === "pong") return;
    const data = JSON.parse(res.data) as MessageData;
    dispatchMessage(data);
  });

  uni.onSocketClose(function () {
    socket.value = null;
    timer.value && clearInterval(timer.value);
    timer.value = null;
  });

  const getInfo = () => {
    send({ type: "info" });
  };

  const createRoom = (roomId: string) => {
    send({ type: "create", roomId });
  };

  const enterRoom = (roomId: string) => {
    send({ type: "enter", roomId });
  };

  const ready = () => {
    send({ type: "ready" });
  };

  const start = () => {
    send({ type: "start" });
  };

  const sendMessage = (text: string) => {
    send({ type: "message", content: text });
  };

  const getMessge = () => {
    send({ type: "getMessage" });
  };

  const selectCharacter = (data: Game.CharacterProp) => {
    send({ type: "character", content: { character: data } });
  };

  const useCard = (data: { card: Game.CardProp; to: string }) => {
    send({ type: "card", content: data });
  };

  return {
    info,
    getInfo,
    connect,
    disConnect,
    enterRoom,
    createRoom,
    getMessge,
    ready,
    start,
    sendMessage,
    selectCharacter,
    useCard
  };
};
