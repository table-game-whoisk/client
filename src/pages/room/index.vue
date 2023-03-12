<template>
  <view class="content">
    <view class="title"> 房间id:{{ info?.room.roomId }} </view>
    <view class="membersBlock">
      <view v-for="(player, index) in info?.room.members" :key="player.id" class="member"> NO.{{ index + 1 }} </view>
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
    margin: 10px 0;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 50%);
    align-content: center;
    justify-content: center;
    .member {
      height: 15vw;
      width: 15vw;
      box-sizing: content-box;
      border-radius: 5px;
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      justify-content: center;
      box-shadow: 1px 1px 3px 2px $theme-color-1;
      background-color: $theme-color-2;
      color: #fff;
    }
  }
  .bottomField {
    flex: 1;
    box-sizing: border-box;
  }
}
</style>
