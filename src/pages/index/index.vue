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
      <view class="avatar">
        <image v-if="user.avatarUrl" :src="user.avatarUrl" class="img"></image>
      </view>
      <view class="nickname">
        {{ user.nickname }}
      </view>
    </view>
    <view class="bottomBox">
      <button class="btn orange" @click="handleCreateRoom">创建房间</button>
      <button class="btn green" @click="() => inputDialog.open()">加入房间</button>
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { createId } from "@/utils/createId";
import { useScoket } from "@/utils/useSocket";
import { useUserStore } from "@/store/user";

const inputDialog = ref<any>(null);
const { user, getUserInfo, createUser } = useUserStore();

const { info, connect, enterRoom, ready, getInfo } = useScoket();

//  查找用户或创建用户 && 链接用户，
const handleConnect = async () => {
  try {
    const value = await getUserInfo();
    if (!value) return;
    if (!value.id) {
      const { id } = await createUser(value?.nickname || "");
      connect(id);
    } else {
      connect(value.id);
    }
  } catch (e) {}
};

onMounted(() => {
  handleConnect();
});

const handleCreateRoom = () => {
  enterRoom(createId());
};

const handleJoinRoom = (roomId: string) => {
  enterRoom(roomId);
};


const readyCount = computed(
  () =>
    `${info.value?.room.members.filter(({ status }) => status === "ready").length || 0}/${
      info.value?.room.members.length || 0
    }`
);

const isReady = computed(() => info.value?.player.status === "ready");

watch(info, () => {
  if (info.value?.room.status === "playing") {
    uni.redirectTo({
      url: "/pages/room/index"
    });
  }
});
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .topBox {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      border-radius: 50%;
      overflow: hidden;
      height: 100px;
      width: 100px;
      .img {
        height: 100px;
        width: 100px;
      }
    }
    .nickname {
      color: #666;
    }
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
