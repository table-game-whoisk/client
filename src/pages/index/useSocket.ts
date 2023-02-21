import { ref } from "vue"

export const useConnect = () => {
  const socket = ref<UniApp.SocketTask | null>(null)
  
  const connect = (userId: string) => {
    socket.value = uni.connectSocket({
      url: `ws://192.168.3.8:5000?userId=${userId}`,
      success() {
        console.log("connect success")
      },
      fail() {
        console.log("connect fail")
      }
    })
  }

  uni.onSocketMessage(function (res) {
    console.log(res)
  })

  return {
    connect,
  }
}