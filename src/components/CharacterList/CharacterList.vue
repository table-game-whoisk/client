<template>
  <!-- <view class="tick"> ⏰00:00 </view> -->
  <view class="content">
    <view class="btn lbtn" @click="() => onCut(true)">
      <uni-icons type="back" size="30" color="#ddd"></uni-icons>
    </view>
    <view class="cardWrap">
      <uni-transition mode-class="fade" :show="show">
        <view class="card">
          <view> {{ character?.name }}</view>
          <view>【生命值】{{ character?.health }}</view>
          <view>【攻击力】{{ character?.attack }}</view>
          <view>【防御值】{{ character?.defense }}</view>
          <view>【闪避值】 {{ character?.dodge }}</view>
          <view>【技能】{{ character?.Skill?.name }}</view>
          <view> {{ character?.Skill?.describe }}</view>
        </view>
      </uni-transition>
    </view>
    <view class="btn rbtn" @click="() => onCut()">
      <uni-icons type="forward" size="30" color="#ddd"></uni-icons>
    </view>
  </view>
  <view class="bottom">
    <button class="btn orange" @click="handleSelect">选定</button>
  </view>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/store/game";
import { onReady } from "@dcloudio/uni-app";
import { computed, ref ,watch} from "vue";
import { storeToRefs } from "pinia";


const game = useGameStore();
const { characterList, playerInfo } = storeToRefs(game);
const emit = defineEmits(["select"]);

const characterIndex = ref<number>(0);
const character = computed(() => characterList.value[characterIndex.value] || null);

const show = ref<boolean>(true);

const onCut = (isLeft?: boolean) => {
  show.value = false;
  if (characterList.value) {
    characterIndex.value = isLeft ? characterIndex.value - 1 : characterIndex.value + 1;
    characterIndex.value %= characterList.value.length;
    if (characterIndex.value < 0) {
      characterIndex.value = characterList.value.length - 1;
    }
  }

  setTimeout(() => {
    show.value = true;
  }, 500);
};

const handleSelect = () => {
  if (character.value) {
    emit("select", character.value);
  }
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
