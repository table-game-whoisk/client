<template>
  <template>
    <view v-if="!showCard" class="content">
      <view class="card">
        <view> {{ playerInfo?.character?.name }}</view>
        <view>【生命值】{{ playerInfo?.character?.health }}</view>
        <view>【攻击力】{{ playerInfo?.character?.attack }}</view>
        <view>【防御值】{{ playerInfo?.character?.defense }}</view>
        <view>【闪避值】{{ playerInfo?.character?.dodge }}</view>
        <view>【手牌数】{{ playerInfo?.cardList?.length }}</view>
        <view>【技能】{{ playerInfo?.character?.Skill?.name }}</view>
        <view> {{ playerInfo?.character?.Skill?.describe }}</view>
      </view>
    </view>
    <view v-else class="cardContent">
      <view class="btn lbtn" @click="() => onCut(true)">
        <uni-icons type="back" size="30" color="#ddd"></uni-icons>
      </view>
      <view class="cardWrap">
        <uni-transition mode-class="fade" :show="show">
          <view class="card">
            <view>{{ cardIndex + 1 }} / {{ self?.cardList?.length || 0 }}</view>
            <view>{{ card?.name }}</view>
            <view>{{ card?.describe }}</view>
          </view>
        </uni-transition>
      </view>
      <view class="btn rbtn" @click="() => onCut()">
        <uni-icons type="forward" size="30" color="#ddd"></uni-icons>
      </view>
    </view>
    <view class="bottom">
      <button :class="showCard ? 'btn' : 'btn green'" @click="() => (showCard = !showCard)">
        {{ showCard ? "查看玩家" : "使用卡牌" }}
      </button>
      <button v-if="showCard" class="btn green" @click="handleUseCard">使用</button>
    </view>
  </template>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/store/game";
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps<{ playerInfo: PlayerInfo | null }>();
const game = useGameStore();
const { playerInfo: self } = storeToRefs(game);
const showCard = ref<boolean>(false);
const show = ref<boolean>(true);
const cardIndex = ref<number>(0);
const emit = defineEmits(["card"]);

const card = computed(() => self.value?.cardList[cardIndex.value] || null);

const onCut = (isLeft?: boolean) => {
  show.value = false;
  if (self.value?.cardList) {
    cardIndex.value = isLeft ? cardIndex.value - 1 : cardIndex.value + 1;
    cardIndex.value %= self.value.cardList.length;
    if (cardIndex.value < 0) {
      cardIndex.value = self.value.cardList.length - 1;
    }
  }

  setTimeout(() => {
    show.value = true;
  }, 500);
};

const handleUseCard = () => {
  const { playerInfo } = props;
  if (!card.value || !playerInfo?.id) return;
  emit("card", { card: card.value, to: playerInfo.id });
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

  .card {
    height: 50vh;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba($color: $theme-color-1, $alpha: 0.5);
    border-radius: 10px;
    padding: 10px;
  }
}
.cardContent {
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
      position: relative;
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
    width: 100px;
    background-color: $theme-color-1;
  }
  .green {
    background-color: $theme-color-2;
  }
  .disable {
  }
}
</style>
