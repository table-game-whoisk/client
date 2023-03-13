<template>
  <view class="content">
    <view class="title"> 房间id:{{ info?.room?.roomId }} </view>
    <view class="membersBlock">
      <view v-for="(player, index) in info?.room?.members" :key="player.id" class="member">
        <image :src="player.avatarUrl" class="img">
          <!-- <view class="cover" v-if="player.status !== 'ready'">
            <uni-icons type="more-filled" size="30" color="#999" />
          </view> -->
        </image>
        <view class="nick">{{ player.nickname }}</view>
      </view>
    </view>
    <view class="bottomField">
      <Chat :messages="messages" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useScoket } from "@/utils/useSocket";
import Chat from "@/components/Chat/index.vue";
import { onMounted, ref } from "vue";

const messages = ref<Message[]>([]);

const { info, getInfo } = useScoket();

onMounted(() => {
  getInfo();
});
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
  }
  .membersBlock {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 50%);
    align-content: center;
    justify-content: center;
    margin: 10px 0;
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
</style>
