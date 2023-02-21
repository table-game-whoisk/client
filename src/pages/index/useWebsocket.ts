import { ref } from "vue"

export const useWebsocket = () => {
  const socket = ref<UniApp.SocketTask | null>(null)

  const connect = ({ roomId, userId }: { roomId: string; userId: string }) => {
    socket.value = uni.connectSocket({
      url: `ws://192.168.3.8:5000?roomId=${roomId}&userId=${userId}`,
      success() {
        console.log("connect success")
      },
      fail() {
        console.log("connect success")
      }
    })
  }

  const disconnect = () => {
    uni.closeSocket({});
  }

  uni.onSocketMessage(function (res) {
    console.log(res)
  });
  return {
    connect,
    disconnect,
  }
}