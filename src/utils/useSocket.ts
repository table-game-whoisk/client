import { useIMStore } from "@/store/im";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

export const useScoket = () => {
  const socket = ref<UniApp.SocketTask | null>(null);
  const info = ref<Info | null>(null);
  const timer = ref<NodeJS.Timer | null>(null);
  const user = ref<UserProp | null>(null);
  const imStore = useIMStore();

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

  const send = <T extends SendType>(data: SendData<T>) => {
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

  const dispatchMessage = <T extends ReceiveType>(data: ReceiveData<T>) => {
    switch (data.type) {
      case "info":
        setInfo(data as ReceiveData<"info">);
        break;
      case "error":
        const { content } = data as ReceiveData<"error">;
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
    const data = JSON.parse(res.data) as ReceiveData<ReceiveType>;
    dispatchMessage(data);
  });

  uni.onSocketClose(function () {
    socket.value = null;
    timer.value && clearInterval(timer.value);
    timer.value = null;
  });

  const setInfo = (data: ReceiveData<"info">) => {
    const { content } = data;
    info.value = content;
    imStore.setInfo(content);
  };

  const getInfo = () => {
    send<"info">({ type: "info", content: null });
  };

  const createRoom = (id: string, memberCount: number) => {
    send<"create">({ type: "create", content: { id, memberCount } });
  };

  const enterRoom = (id: string) => {
    send<"join">({ type: "join", content: id });
  };

  const ready = () => {
    send<"ready">({
      type: "ready",
      content: null
    });
  };

  const start = () => {
    if (!info.value?.room?.id) return;
    send<"start">({ type: "start", content: info.value?.room?.id });
  };

  const sendMessage = (text: string) => {
    send<"message">({
      type: "message",
      content: text
    });
  };

  return {
    info,
    getInfo,
    connect,
    disConnect,
    enterRoom,
    createRoom,
    ready,
    start,
    sendMessage
  };
};
