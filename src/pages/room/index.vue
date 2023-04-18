<template>
  <view class="content">
    <view class="title"> 房间id:{{ info?.room?.id }} </view>
    <view class="membersBlock">
      <view
        v-for="(player, index) in info?.room?.members"
        :key="player.id"
        class="member"
        @click="() => showPooup(player)"
      >
        <image :src="player.avatar" class="img">
          <!-- <view class="cover" v-if="player.status !== 'ready'">
            <uni-icons type="more-filled" size="30" color="#999" />
          </view> -->
        </image>
        <view class="nick">{{ player.nickname }}</view>
      </view>
    </view>
    <view class="playerPannel" @click="() => playerInfo && showPooup(playerInfo)">
      <view class="topInfo">
        <view class="left">
          <view class="nickname">{{ info?.player?.nickname }}dwedwedaefaf</view>
          <view>("慈悲的神父")</view>
        </view>
        <view class="right">
          <view>❤:{{ 1 }}</view>
          <view>🔪:{{ 1 }}</view>
          <view>🛡:{{ 1 }}</view>
          <view>✨:{{ 1 }}</view>
        </view>
      </view>
      <view class="bottomInfo"> [skillname] "技能名称" </view>
    </view>
    <view class="bottomField">
      <Chat @send="sendMessage" />
    </view>
  </view>
  <uni-popup ref="popup" background-color="#fff" type="bottom">
    <view class="popContent">
      <!-- <CharacterList v-if="gameStep === 'character'" @select="selectCharacter" />
      <PlayerPanel v-else :playerInfo="player" @card="useCard" /> -->
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { useScoket } from "@/utils/useSocket";
import Chat from "@/components/Chat/index.vue";
import { onMounted, ref, watch } from "vue";
import CharacterList from "@/components/CharacterList/CharacterList.vue";
import PlayerPanel from "@/components/PlayerPanel/PlayerPanel.vue";
import { useGameStore } from "@/store/game";
import { storeToRefs } from "pinia";
import { useIMStore } from "@/store/im";

const { getInfo, sendMessage } = useScoket();
const imStore = useIMStore();
const { info } = storeToRefs(imStore);
const game = useGameStore();
const { gameStep, playerInfo } = storeToRefs(game);
const popup = ref<any>(null);
const player = ref<PlayerInfo | null>(null);

onMounted(() => {
  getInfo();
});

watch(gameStep, () => {
  if (gameStep.value === "character") {
    popup.value?.open();
  } else if (gameStep.value === "round") {
  }
});

const showPooup = (data: PlayerInfo) => {
  player.value = data;
  popup.value?.open();
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
  }
  .membersBlock {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(2, 50%);
    align-content: center;
    justify-content: center;
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
  .playerPannel {
    height: 10vh;
    box-shadow: 1px 1px 3px 3px #ddd;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;

    .topInfo {
      font-size: 0.8em;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .nickname {
          width: 10vw;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .right {
        display: flex;
        width: 30vw;
        justify-content: space-between;
        font-size: 0.8em;
      }
    }
    .bottomInfo {
      margin-top: 5px;
      font-size: 0.8em;
      box-sizing: border-box;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .bottomField {
    flex: 1;
    box-sizing: border-box;
  }
}
.popContent {
  max-height: 70vh;
  padding: 10px;
}
</style>
