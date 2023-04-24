<template>
  <view class="content" v-if="info?.room?.status === 'addKey'">
    <view class="tips">
      <text>填写一个词语。游戏开始后，将随机抓取几个玩家填写的词语，被抓取到的玩家，作为卧底身份进行游戏</text>
      <view class="input">
        <input type="text" placeholder="请填写一个词语" maxlength="10" v-model="keyWord" />
      </view>
    </view>
    <button class="btn green" @click="() => (keyWord = '')">再想想</button>
    <button class="btn orange" @click="handleSubmitKey">就它了</button>
  </view>
  <view class="content" v-else>
    <view class="textframe">
      <text>点击你认为是卧底玩家的头像进行投票</text>
    </view>
    <button class="btn green">再想想</button>
    <button class="btn orange">就是他</button>
  </view>
</template>

<script lang="ts" setup>
// 关键词提交长度做校验！！！！最长不超过10个汉字
import { useIMStore } from "@/store/im";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const imStore = useIMStore();
const { info } = storeToRefs(imStore);
const keyWord = ref<string>("");
const emit = defineEmits(["send", "vote"]);

const handleSubmitKey = () => {
  if (!keyWord.value) return;
  if (keyWord.value.length > 10) {
    uni.showToast({
      title: "请换个短一点的词语",
      icon: "error"
    });
    return;
  }
  emit("send", keyWord.value);
};

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  height: 100%;
  box-sizing: border-box;
  .tips {
    color: #fff;
    background-color: #fc7300;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    .input {
      line-height: 36px;
      color: #333;
      padding: 20px;
      text-align: center;
      background-color: #fff;
      border-radius: 8px;
      margin-top: 10px;
      box-shadow: 1px 1px 5px 3px #fc7300;
    }
  }

  .textframe {
    color: #fc7300;
    margin-bottom: 20px;
    border-radius: 8px;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 5px 3px #fc7300;
  }

  .btn {
    width: 40%;
    margin-bottom: 20px;
    color: #fff;
  }
  .orange {
    background-color: #fc7300;
  }
  .gray {
    background-color: #fc7300;
    opacity: 0.5;
  }
  .green {
    background-color: #1f8a70;
  }
}
</style>
