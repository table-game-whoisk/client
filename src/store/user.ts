import { defineStore } from "pinia";
import { request, apis } from "@/utils/request";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserProp>(uni.getStorageSync("user") || { id: null, nickname: null, avatar: null });

  const createUser = async (data: { nickname: string; avatar: string }) => {
    const res = (await request({ url: apis.user.create, method: "POST", data })) as UserProp;
    res && setUserInfo(res);
  };

  const setUserInfo = (data: { id?: string; nickname?: string; avatar?: string }) => {
    user.value = { ...user.value, ...data };
    uni.setStorageSync("user", { ...user.value, ...data });
  };

  return { user, createUser };
});
