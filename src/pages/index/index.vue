<template>
  <view class="content" v-if="info?.room">
    <view class="title">
      <text>房间号：</text><text>{{ info.room.id }}</text>
      <text class="btn" v-if="info?.id === info.room.owner" @click="() => disslovePoup?.open()">解散房间</text>
    </view>
    <view class="title"> 当前已准备： {{ readyCount }} </view>
    <view class="membersBlock">
      <view v-for="(player, index) in info?.room.members" :key="player.id" class="member">
        <image :src="player.avatar" class="img">
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
      <button v-if="info?.id === info.room.owner" class="btn green" @click="start">开始</button>
    </view>
  </view>
  <view class="content" v-else>
    <view class="topBox">
      <view v-if="user.avatar" class="avatar">
        <image :src="user.avatar" class="img"></image>
      </view>
      <view v-if="user.nickname" class="nickname">
        {{ user.nickname }}
      </view>
    </view>
    <view class="bottomBox">
      <button class="btn orange" @click="() => createDialog.open()">创建房间</button>
      <button class="btn green" @click="openJoinRoom">加入房间</button>
    </view>
  </view>
  <uni-popup ref="popup" background-color="#fff" type="top">
    <view class="popup-content">
      <button open-type="chooseAvatar" @chooseavatar="(e:any)=>avatar = e.detail.avatarUrl" class="avatar-wrap">
        <image class="avatar" :src="avatar"></image>
      </button>
      <input
        type="nickname"
        placeholder="请输入昵称"
        :value="nickname"
        @change="(e:any)=>nickname = e.detail.value"
        class="input"
      />
      <button @click="handleCreateUser" class="btn">确定</button>
    </view>
  </uni-popup>
  <uni-popup ref="createDialog" type="dialog">
    <uni-popup-dialog type="info" title="设置房间" @confirm="handleCreateRoom">
      <uni-number-box :min="4" :max="10" :step="1" v-model="memberNumber" />
    </uni-popup-dialog>
  </uni-popup>
  <uni-popup ref="inputDialog" type="dialog"
    ><uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="加入房间"
      placeholder="请输入房间号"
      @confirm="handleJoinRoom"
  /></uni-popup>
  <uni-popup ref="disslovePoup" type="dialog">
    <uni-popup-dialog type="info" title="提示" content="确定解散房间？" @confirm="handleDisslove" />
  </uni-popup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";
import { createId } from "@/utils/createId";
import { useScoket } from "@/utils/useSocket";
import { useUserStore } from "@/store/user";
import { storeToRefs, type Store, type _UnwrapAll } from "pinia";
import { useIMStore } from "@/store/im";

const inputDialog = ref<any>(null);
const createDialog = ref<any>(null);
const popup = ref<any>(null);
const disslovePoup = ref<any>(null);
const userStore = useUserStore();
const imStore = useIMStore();
const { user } = storeToRefs(userStore);
const { info } = storeToRefs(imStore);
const nickname = ref<string>("");
const avatar = ref<string>(
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
);
const memberNumber = ref<number>(4);

const { connect, createRoom, enterRoom, ready, start, sendDisslove } = useScoket();

onMounted(() => {
  handleConnect();
});

watch(info, () => {
  if (info.value?.room?.status && info.value?.room?.status !== "end") {
    uni.redirectTo({
      url: "/pages/room/index"
    });
  }
});

const readyCount = computed(
  () =>
    `${info.value?.room?.members?.filter(({ status }) => status === "ready").length || 0}/${
      info.value?.room?.memberCount || 4
    }`
);

const isReady = computed(() => info.value?.status === "ready");

//  查找用户或创建用户 && 链接用户，
const handleConnect = async () => {
  try {
    if (!user.value.id) {
      popup.value && popup.value.open();
    } else {
      !info.value?.room && connect({ ...user.value });
    }
  } catch (e) {}
};

const handleCreateUser = async () => {
  if (!nickname.value) {
    return;
  }
  const data = {
    nickname: nickname.value,
    avatar: avatar.value
  };
  userStore.createUser(data);
  popup.value && popup.value.close();
};

const handleCreateRoom = () => {
  if (!user.value.id) {
    popup.value && popup.value.open();
    return;
  }
  createRoom(createId(), memberNumber.value);
};

const openJoinRoom = () => {
  if (!user.value.id) {
    popup.value && popup.value.open();
    return;
  }
  inputDialog && inputDialog.value.open();
};

const handleJoinRoom = (roomId: string) => {
  if (!user.value.id) {
    popup.value && popup.value.open();
    return;
  }
  enterRoom(roomId);
};

const handleDisslove = () => {
  info.value?.room && sendDisslove(info.value.room.owner);
};
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    .btn {
      margin-left: 10px;
      color: brown;
      text-decoration: underline;
    }
  }
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
.popup-content {
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar-wrap {
    display: flex;
    align-items: center;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    .avatar {
      height: 60px;
      width: 60px;
    }
  }
  .input {
    height: 32px;
    text-align: center;
    margin: 30px;
  }
  .btn {
    width: 40%;
    color: #fff;
    background-color: #fc7300;
  }
}
</style>
