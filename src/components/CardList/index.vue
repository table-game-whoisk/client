<template>
  <view class="tick"> ⏰00:00 </view>
  <view class="content">
    <view class="btn lbtn" @click="() => onCut(true)">
      <uni-icons type="back" size="30" color="#ddd"></uni-icons>
    </view>
    <view class="cardWrap">
      <uni-transition mode-class="fade" :show="show">
        <view class="card">
          <view> {{ playerInfo?.character?.name }}</view>
          <view>【生命值】{{ playerInfo?.character?.health }}</view>
          <view>【攻击力】{{ playerInfo?.character?.attack }}</view>
          <view>【防御值】{{ playerInfo?.character?.defense }}</view>
          <view>【闪避值】 {{ playerInfo?.character?.dodge }}</view>
          <view>【技能】{{ playerInfo?.character?.Skill?.name }}</view>
          <view> {{ playerInfo?.character?.Skill?.describe }}</view>
        </view>
      </uni-transition>
    </view>
    <view class="btn rbtn" @click="() => onCut()">
      <uni-icons type="forward" size="30" color="#ddd"></uni-icons>
    </view>
  </view>
  <view class="bottom">
    <button class="btn orange">选定</button>
  </view>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/store/game";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const game = useGameStore();
const { characterList, playerInfo } = storeToRefs(game);

const show = ref<boolean>(true);

const onCut = (isLeft?: boolean) => {
  show.value = false;
  setTimeout(() => {
    show.value = true;
  }, 500);
};
</script>

<style lang="scss" scoped>
.tick {
  text-align: center;
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  .btn {
    padding: 5px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    border-radius: 50%;
  }
  .lbtn {
  }
  .cardWrap {
    height: 50vh;
    width: 60vw;
    box-sizing: border-box;
    .card {
      height: 50vh;
      width: 100%;
      box-sizing: border-box;
      background-color: rgba($color: $theme-color-1, $alpha: 0.5);
      border-radius: 10px;
      padding: 10px;
    }
  }
  .rbtn {
  }
}
.bottom {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    color: #fff;
    background-color: $theme-color-1;
  }
  .disable {
  }
}
</style>
