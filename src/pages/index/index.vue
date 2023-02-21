<template>
  <view class="content">
    <view class="topBox">
      {{ user.nickname }}
    </view>
    <view class="bottomBox">
      <button class="btn orange" @click="handleCreateRoom">创建房间</button>
      <button class="btn green" @click="inputDialogToggle">加入房间</button>
    </view>
  </view>
  <uni-popup ref="inputDialog" type="dialog"
    ><uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="加入房间"
      placeholder="请输入房间号"
      @confirm="handleJoinRoom"
  /></uni-popup>
  <uni-popup ref="createDialog" type="dialog"
    ><uni-popup-dialog
      mode="input"
      ref="inputClose"
      title="创建用户"
      placeholder="请输入昵称"
      @confirm="handleCreateUser"
  /></uni-popup>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { userStore } from "@/store/user";
import { createId } from "@/utils/createId";
import { useConnect } from "./useSocket";

const inputDialog = ref<any>(null);
const createDialog = ref<any>(null);
const user = userStore();
const { connect } = useConnect();

const ShowCreateDialog = () => {
  if (!user.id) {
    createDialog.value?.open();
    return true;
  }
};

onMounted(() => {
  ShowCreateDialog();
  user.id && connect(user.id);
});

watch(user, () => {
  () => {
    user.id && connect(user.id);
  };
});

const handleCreateUser = (value: string) => {
  user.create(value);
};

const jumpToReadyPage = () => {
  uni.navigateTo({
    url: "/pages/ready/index"
  });
};

const handleCreateRoom = () => {
  if (ShowCreateDialog()) return;
  const roomId = createId();
  uni.sendSocketMessage({
    data: JSON.stringify({ type: "enter", content: { roomId } }),
    success() {
      console.log("send success");
    },
    fail() {
      console.log("send fail");
    }
  });
  jumpToReadyPage();
};

const inputDialogToggle = () => {
  if (ShowCreateDialog()) return;
  inputDialog.value?.open();
};

const handleJoinRoom = (value: string) => {};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .topBox {
    text-align: center;
    padding: 20px 0;
  }
  .bottomBox {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn {
      width: 40%;
      margin-bottom: 20px;
      color: #fff;
    }
    .orange {
      background-color: #fc7300;
    }
    .green {
      background-color: #1f8a70;
    }
  }
}
</style>
