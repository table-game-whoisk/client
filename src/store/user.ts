import { defineStore } from "pinia";
import { request, apis } from "@/utils/request";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserProp>(uni.getStorageSync("user") || { id: null });

  const createUser = async () => {
    const res = (await request({ url: apis.user.create, method: "POST", data: {} })) as UserProp;
    uni.setStorageSync("user", { ...user.value, ...res });
    const data = { ...user.value, ...res };
    user.value = data;
    return data;
  };

  return { user, createUser };
});
