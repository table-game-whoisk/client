<template>
  <view class="content">
    <view> 房间号：{{ info?.room.roomId }} </view>
    <view class="topBox">
      <view v-for="player in players" class="avatarWrap" :key="player">
        <view :class="player % 2 ? 'active avatar' : 'avatar'">
          <view>{{ player }}</view>
        </view>
      </view>
    </view>
    <view class="bottomBox">
      <button class="btn">准备</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useScoket } from "../../utils/useSocket";

const players = ref(4);
const { info, getInfo } = useScoket();

onMounted(() => {
  getInfo();
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .topBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .avatarWrap {
      width: 20vw;
      height: 20vw;
      padding: 10px;
      box-sizing: border-box;
      .avatar {
        border-radius: 50%;
        height: 100%;
        height: flex;
        background-color: #bfdb38;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
      .active {
        background-color: #fc7300;
      }
    }
  }
  .bottomBox {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      width: 40%;
      margin-bottom: 20px;
      color: #fff;
      background-color: #1f8a70;
    }
  }
}
</style>
