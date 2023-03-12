import { defineStore } from "pinia";
import { request, apis } from "@/utils/request";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserProp>(uni.getStorageSync("user") || { id: null, nickname: null, ip: null, avatarUrl: null });

  const createUser = async (name: string) => {
    const res = (await request({ url: apis.user.create, method: "POST", data: { nickname: name } })) as UserProp;
    uni.setStorageSync("user", { ...user.value, ...res });
    const data = { ...user.value, ...res };
    user.value = data;
    return data;
  };

  const getUserInfo = async () => {
    try {
      const info = await uni.getUserInfo({ provider: "weixin" });
      const {
        userInfo: { nickName, avatarUrl }
      } = info as unknown as UniApp.GetUserInfoRes;
      const res = (await request({ url: apis.user.info, method: "GET" })) as UserProp;
      const { id, ip } = res || {};
      const data = { id, ip, nickname: nickName, avatarUrl };
      user.value = data;
      uni.setStorageSync("user", { ...user.value, ...res });
      return data;
    } catch (e) {
      return null;
    }
  };

  return { user, createUser, getUserInfo };
});
