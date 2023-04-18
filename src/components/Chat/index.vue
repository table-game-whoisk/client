<template>
  <view class="content">
    <view class="messageField">
      <scroll-view
        scroll-y="true"
        :scroll-into-view="bottomId"
        class="inner"
        enable-flex="true"
        scroll-with-animation="true"
      >
        <view
          v-for="(item, index) in messageList"
          :key="item.timestamp"
          :class="item.messageFrom.id === '0' ? 'message orange' : 'message green'"
        >
          <view class="time">
            <view class="name">[{{ item.messageFrom.nickname }}]</view>
            <view>{{ new Date(item.timestamp).toLocaleTimeString() }}</view></view
          >
          <view class="txt"> {{ item.message }} </view>
        </view>
        <view :id="bottomId"></view>
      </scroll-view>
    </view>
    <view class="bottom">
      <input type="text" class="input" v-model="text" />
      <uni-icons type="paperplane-filled" size="30" class="icon" @click="onSend"></uni-icons>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useIMStore } from "@/store/im";
import { storeToRefs } from "pinia";
import { watch, ref, computed, type VNodeRef } from "vue";
const text = ref<string>("");
const bottomId = ref<string>("bottom");

const emit = defineEmits(["send"]);
const imStore = useIMStore();
const { info } = storeToRefs(imStore);

const messageList = computed(() => info.value?.room?.messageList || []);

const onSend = () => {
  emit("send", text.value);
  text.value = "";
};

const goBottom = () => {
  bottomId.value = bottomId.value + messageList.value.length;
};

watch(messageList, () => {
  goBottom();
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  height: 100%;
  box-sizing: border-box;
  .messageField {
    flex: 1;
    border-bottom: none;
    box-sizing: border-box;
    padding: 10px 0;
    .inner {
      max-height: 45vh;
      box-sizing: border-box;
      overflow-y: scroll;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      .message {
        margin: 5px 0;
        max-width: 100%;
        border-radius: 5px;
        color: #fff;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .time {
          display: flex;
          border-bottom: 1px solid #eee;
          font-size: 0.5em;
          padding: 3px;
          .name {
            margin-right: 10px;
          }
        }
        .txt {
          margin-top: 5px;
          box-sizing: border-box;
          max-width: 100%;
          word-wrap: break-word;
        }
      }
      .green {
        background-color: $theme-color-2;
      }
      .orange {
        background-color: $theme-color-4;
      }
    }
  }
  .bottom {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    box-shadow: 1px 1px 3px 3px #ddd;
    border-radius: 5px;
    padding: 5px 10px;
    .input {
      flex: 1;
    }
    .icon {
      height: 30px;
      color: $theme-color-1;
      width: 30px;
    }
  }
}
</style>
