import { defineStore } from "pinia"
import { request, apis } from "@/utils/request"

export const userStore = defineStore<string, Store.User>("user", {
  state: () => {
    const value = uni.getStorageSync("user");
    return value ? value : { id: "", nickname: "" };
  },
  actions: {
    async create(name: string) {
      const user = await request({ url: apis.user.create, method: "POST", data: { nickname: name }}) as UserProp
      uni.setStorageSync("user", user)
      this.id = user.id;
      this.nickname = name
    }
  }
})