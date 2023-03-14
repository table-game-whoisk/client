<template>
  <view class="content" v-if="info?.room?.roomId">
    <view class="topBox"> 房间号： {{ info.room.roomId }} </view>
    <view class="topBox"> 当前已准备： {{ readyCount }} </view>
    <view class="membersBlock">
      <view v-for="(player, index) in info?.room.members" :key="player.id" class="member">
        <image :src="player.avatarUrl" class="img">
          <view class="cover" v-if="player.status !== 'ready'">
            <uni-icons type="more-filled" size="30" color="#999"></uni-icons> </view
        ></image>
        <view class="nick">{{ player.nickname }}</view>
      </view>
    </view>
    <view class="bottomBox">
      <button :class="isReady ? 'btn gray' : 'btn orange'" @click="ready" :disabled="isReady">
        {{ isReady ? "已准备" : "准备" }}
      </button>
      <button v-if="info.player?.id === info.room.owner" class="btn green" @click="start">开始</button>
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
import { debounce } from "@/utils";

const inputDialog = ref<any>(null);
const { user, getUserInfo, createUser } = useUserStore();

const { info, connect, createRoom, enterRoom, ready, start, getInfo } = useScoket();

watch(info, () => {
  if (info.value?.room?.status === "playing") {
    uni.redirectTo({
      url: "/pages/room/index"
    });
  }
});

//  查找用户或创建用户 && 链接用户，
const handleConnect = async () => {
  try {
    const value = await getUserInfo();

    if (!value) return;
    if (!value.id) {
      const { id, avatarUrl, nickname } = await createUser(value?.nickname || "");
      connect({ userId: id, avatarUrl, nickname });
    } else {
      const { id, avatarUrl, nickname } = value;
      connect({ userId: id, avatarUrl, nickname });
    }
  } catch (e) {}
};

onMounted(() => {
  handleConnect();
});

const handleCreateRoom = () => {
  createRoom(createId());
};

const handleJoinRoom = (roomId: string) => {
  enterRoom(roomId);
};

const readyCount = computed(
  () =>
    `${info.value?.room?.members.filter(({ status }) => status === "ready").length || 0}/${
      info.value?.room?.members.length || 0
    }`
);

const isReady = computed(() => info.value?.player?.status === "ready");
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
  .membersBlock {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 50%);
    align-content: center;
    justify-content: center;
    padding: 10px;
    .member {
      box-sizing: content-box;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      align-items: center;
      justify-content: center;
      height: 20vw;
      .img {
        height: 15vw;
        width: 15vw;
        position: relative;
        .cover {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 15vw;
          width: 15vw;
          left: 0;
          top: 0;
          background-color: rgba($color: #000000, $alpha: 0.5);
        }
      }
      .nick {
        width: 15vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
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
