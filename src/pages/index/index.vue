<template>
  <view class="content">
    <button class="btn orange" @click="handleCreateRoom">创建房间</button>
    <button class="btn green" @click="inputDialogToggle">加入房间</button>
  </view>
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog
      ref="inputClose"
      mode="input"
      title="加入房间"
      placeholder="请输入房间号"
      @confirm="handleJoinRoom"
    />
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputDialog = ref<any>(null);

const jumpToReadyPage = () => {
  uni.navigateTo({
    url: "/pages/ready/index"
  });
};

const handleCreateRoom = () => {
  jumpToReadyPage();
};

const inputDialogToggle = () => {
  inputDialog.value?.open();
};

const handleJoinRoom = (value: string | number) => {
  console.log(value);
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
</style>
