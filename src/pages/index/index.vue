<template>
  <view class="content" v-if="info?.room.roomId">
    <view class="topBox"> 房间号： {{ info.room.roomId }} </view>
    <view class="topBox"> 当前已准备： {{ readyCount }} </view>
    <view class="bottomBox">
      <button :class="isReady ? 'btn gray' : 'btn orange'" @click="ready" :disabled="isReady">
        {{ isReady ? "已准备" : "准备" }}
      </button>
    </view>
  </view>
  <view class="content" v-else>
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
import { computed, onMounted, ref, watch } from "vue";
import { userStore } from "@/store/user";
import { createId } from "@/utils/createId";
import { useScoket } from "@/utils/useSocket";

const inputDialog = ref<any>(null);
const createDialog = ref<any>(null);
const user = userStore();

const { info, connect, enterRoom, ready } = useScoket();

const getUserInfo = async () => {
  await user.info();
  ShowCreateDialog();
};

onMounted(() => {
  getUserInfo();
  user.id && connect(user.id);
});

/// 创建房间创建用户
const ShowCreateDialog = () => {
  if (!user.id) {
    createDialog.value?.open();
    return true;
  }
};

const handleCreateUser = async (value: string) => {
  const { id } = await user.create(value);
  id && connect(id);
};

const handleCreateRoom = () => {
  if (ShowCreateDialog()) return;
  enterRoom(createId());
};

const handleJoinRoom = (value: string) => {};

const inputDialogToggle = () => {
  if (ShowCreateDialog()) return;
  inputDialog.value?.open();
};

/// 准备
const readyCount = computed(
  () =>
    `${info.value?.room.members.filter(({ status }) => status === "ready").length || 0}/${
      info.value?.room.members.length || 0
    }`
);

const isReady = computed(() => info.value?.player.status === "ready");
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
    .gray {
      background-color: #fc7300;
      opacity: 0.5;
    }
    .green {
      background-color: #1f8a70;
    }
  }
}
</style>
