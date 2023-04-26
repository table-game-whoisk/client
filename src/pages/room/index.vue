<template>
  <view class="content">
    <view class="title">
      <text>房间id:{{ info?.room?.id }}</text>
      <text class="keyWordBtn orange" v-if="info?.room?.undercoverKey.length" @click="() => popup?.open()">
        关键词
      </text>
      <uni-icons
        class="exitBtn"
        type="closeempty"
        size="30"
        v-if="info?.id === info?.room?.owner"
        @click="() => disslovePoup?.open()"
      >
      </uni-icons>
    </view>
    <view class="membersBlock">
      <view
        v-for="(player, index) in info?.room?.members"
        :key="player.id"
        class="member"
        @click="() => handleSelectPlayer(player)"
      >
        <image
          :src="player.avatar"
          class="img"
          :class="
            selectedPlayer?.id === player.id
              ? 'selected'
              : info?.room?.status === 'round' && player.status === 'playing'
              ? 'current'
              : ''
          "
        >
          <uni-badge
            class="badge"
            :text="player.voteCount + '票'"
            type="warning"
            v-if="info?.room?.status === 'vote'"
          />
          <view class="cover" v-if="player.status === 'out'"> OUT </view>
        </image>
        <view class="nick">{{ player.nickname }}</view>
      </view>
    </view>
    <view class="bottomField">
      <NoticePannel
        v-if="info?.room?.status === 'addKey' || info?.room?.status === 'vote'"
        @send="sendKey"
        @cancle-select="() => (selectedPlayer = null)"
        @vote="handleVote"
      />
      <Chat @send="sendMessage" v-else />
    </view>
  </view>
  <uni-popup ref="popup" type="center">
    <view class="popup-content">
      <text class="header"> 我的关键词</text>
      <text class="keyWord">{{ info?.key }}</text>
      <text class="header">卧底关键词</text>
      <text class="keyWord green" v-for="keyWrod in info?.room?.undercoverKey" :key="keyWrod">{{ keyWrod }}</text>
    </view>
  </uni-popup>
  <uni-popup ref="disslovePoup" type="dialog">
    <uni-popup-dialog type="info" title="提示" content="确定解散房间？" @confirm="handleDisslove" />
  </uni-popup>
</template>

<script lang="ts" setup>
import { useScoket } from "@/utils/useSocket";
import Chat from "@/components/Chat/index.vue";
import NoticePannel from "@/components/NoticePannel/NoticePannel.vue";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useIMStore } from "@/store/im";

const { sendMessage, sendKey, sendDisslove, senVote } = useScoket();
const imStore = useIMStore();
const { info } = storeToRefs(imStore);
const popup = ref<any>(null);
const disslovePoup = ref<any>(null);
const selectedPlayer = ref<PlayerInfo | null>(null);

watch(info, () => {
  if (!info.value?.room || info.value?.room.status === "end") {
    uni.redirectTo({
      url: "/pages/index/index"
    });
    return;
  }
  if (info.value?.room?.status && info.value?.room?.status === "round") {
    selectedPlayer.value = null;
  }
});

const handleDisslove = () => {
  info.value?.room && sendDisslove(info.value.room.owner);
};

const handleSelectPlayer = (player: PlayerInfo) => {
  if (info.value?.room?.status === "round") return;
  selectedPlayer.value = player.id === selectedPlayer.value?.id ? null : player;
};

const handleVote = () => {
  if (selectedPlayer.value) {
    senVote(selectedPlayer.value?.id);
    selectedPlayer.value = null;
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  .title {
    color: #888;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .exitBtn {
      background-color: #eee;
    }
    .keyWordBtn {
      color: #fff;
      padding: 5px;
      border-radius: 4px;
    }
    .orange {
      background-color: #fc7300;
    }
    .green {
      background-color: #1f8a70;
    }
  }
  .membersBlock {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 50%);
    align-content: center;
    justify-content: center;
    height: 42vw;
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
        transition: box-shadow 0.5s;
        .cover {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 15vw;
          width: 15vw;
          left: 0;
          top: 0;
          background-color: rgba($color: #fc7300, $alpha: 0.5);
          color: #fff;
        }
        .badge {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .nick {
        width: 15vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .selected {
      box-shadow: 1px 1px 5px 3px #fc7300;
    }
    .current {
      box-shadow: 1px 1px 5px 3px #1f8a70;
    }
  }
  .bottomField {
    flex: 1;
    box-sizing: border-box;
  }
}
.popup-content {
  width: 80vw;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  .keyWord {
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-size: 1.2rem;
    margin-bottom: 10px;
    background-color: #fc7300;
  }
  .green {
    background-color: #1f8a70;
  }
}
</style>
