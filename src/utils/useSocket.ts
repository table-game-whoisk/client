import { useGameStore } from "@/store/game";
import { useIMStore } from "@/store/im";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

export const useScoket = () => {
  const socket = ref<UniApp.SocketTask | null>(null);
  const playerInfo = ref<Info | null>(null);
  const timer = ref<NodeJS.Timer | null>(null);
  const user = ref<UserProp | null>(null);
  const imStore = useIMStore();
  const { info } = storeToRefs(imStore);

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

  const connect = (data: UserProp) => {
    const { id, nickname, avatar } = data;
    user.value = data;
    socket.value = uni.connectSocket({
      url: `${import.meta.env.VITE_SOCKET_PORT}?id=${id}&nickname=${nickname}&avatar=${avatar}`,
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

  const send = <T extends messageType>(data: SendData<T>) => {
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

  const dispatchMessage = <T extends messageType>(data: MessageData<T>) => {
    switch (data.type) {
      case "info":
        setInfo(data as MessageData<"info">);
        break;
      // case "message":
      //   game.setMessageList(messages || []);
      //   break;
      // case "character":
      //   game.setCharacter(content.characterList);
      //   break;
      // case "round":
      //   game.setGameStep("round");
      //   content && game.setCurrRoundPlayer(content);
      //   break;
      case "error":
        const { content } = data as MessageData<"error">;
        uni.showToast({
          title: content,
          icon: "error"
        });
        break;
    }
    return;
  };

  uni.onSocketMessage(function (res) {
    if (res.data === "pong") return;
    const data = JSON.parse(res.data) as MessageData<messageType>;
    dispatchMessage(data);
  });

  uni.onSocketClose(function () {
    socket.value = null;
    timer.value && clearInterval(timer.value);
    timer.value = null;
  });

  const setInfo = (data: MessageData<"info">) => {
    const { content } = data;
    playerInfo.value = content;
    imStore.setInfo(content);
  };

  const getInfo = () => {
    send({ type: "info" });
  };

  const createRoom = (id: string, number: number) => {
    send<"createRoom">({ type: "createRoom", content: { id, number } });
  };

  const enterRoom = (id: string) => {
    send<"joinRoom">({ type: "joinRoom", content: { id } });
  };

  const ready = () => {
    send<"ready">({ type: "ready" });
  };

  const start = () => {
    if (!playerInfo.value?.room?.id) return;
    send<"start">({ type: "start", content: { id: playerInfo.value.room.id } });
  };

  const sendMessage = (text: string) => {
    if (info.value) {
      send<"message">({
        type: "message",
        content: {
          timestamp: Date.now(),
          messageFrom: info.value.player,
          message: text
        }
      });
    }
  };

  return {
    playerInfo,
    getInfo,
    connect,
    disConnect,
    enterRoom,
    createRoom,
    ready,
    start,
    sendMessage,
  };
};
