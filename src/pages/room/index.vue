<template>
  <view class="content">
    <view class="title">
      <text>房间id:{{ info?.room?.id }}</text>
      <text class="keyWordBtn orange" @click="() => showKeyWord(true)">我的关键词</text>
      <text class="keyWordBtn green" @click="() => showKeyWord()">卧底关键词</text>
    </view>
    <view class="membersBlock">
      <view v-for="(player, index) in info?.room?.members" :key="player.id" class="member">
        <image :src="player.avatar" class="img"> </image>
        <view class="nick">{{ player.nickname }}</view>
      </view>
    </view>
    <view class="bottomField">
      <Chat @send="sendMessage" />
      <!-- <NoticePannel /> -->
    </view>
  </view>
  <uni-popup ref="popup" type="center">
    <view class="popup-content">
      <text class="header">{{ isSelf ? "我的关键词" : "卧底关键词" }}</text>
      <text class="keyWord">巴拉巴拉巴拉零八零八</text>
      <text class="keyWord">巴拉巴拉巴拉零八零八</text>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { useScoket } from "@/utils/useSocket";
import Chat from "@/components/Chat/index.vue";
import NoticePannel from "@/components/NoticePannel/NoticePannel.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useIMStore } from "@/store/im";

const { sendMessage } = useScoket();
const imStore = useIMStore();
const { info } = storeToRefs(imStore);
const popup = ref<any>(null);
const isSelf = ref<boolean>(false);

const showKeyWord = (self?: boolean) => {
  popup.value?.open();
  isSelf.value = !!self;
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
    .keyWordBtn {
      color: #fff;
      padding: 5px;
      margin-left: 5px;
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
    font-size: 2rem;
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
}
</style>
