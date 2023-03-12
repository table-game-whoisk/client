<template>
  <view class="content">
    <view class="messageField">
      <view class="inner">
        <view></view>
        <view v-for="item in messages" :key="(item as Message).id" class="message">{{
          (item as Message).message
        }}</view>
      </view>
    </view>
    <view class="bottom">
      <input type="text" class="input" />
      <uni-icons type="paperplane-filled" size="30" class="icon"></uni-icons>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { watch, ref, type VNodeRef, onMounted } from "vue";
const props = defineProps({ messages: Array });
const scrollBox = ref();

watch(props, () => {
  scrollBox.value?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px 3px $theme-color-1;
  border-radius: 3px;
  height: 100%;
  .messageField {
    flex: 1;
    border-bottom: none;
    box-sizing: border-box;
    padding: 10px;
    .inner {
      max-height: 55vh;
      box-sizing: border-box;
      overflow: scroll;
      .message {
        margin: 5px;
      }
    }
  }
  .bottom {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-top: 1px solid $theme-color-1;
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
