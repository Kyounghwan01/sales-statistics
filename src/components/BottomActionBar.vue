<template>
  <div class="bottom-action-bar-container">
    <div
      class="bottom-action-bar__inner"
      :style="{ maxWidth: contentMaxWidth }"
    >
      <button
        v-if="!hideButtonBack"
        class="bottom-action-bar__back-button"
        @click="$router.go(-1)"
      >
        <i class="el-icon-arrow-left"></i>
        <span>뒤로가기</span>
      </button>
      <div>
        <slot name="left"></slot>
      </div>
      <div class="message">
        {{ message || "" }}
      </div>

      <div class="alert-message">
        {{ alert || "" }}
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    alert: String,
    hideButtonBack: { type: Boolean, default: false },
    contentMaxWidth: { type: String, default: "100%" }
  }
};
</script>

<style lang="scss" scoped>
.bottom-action-bar-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 60px;
  background-color: #64aeff;
  color: #fff;
  padding: 13px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom-action-bar__inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  height: 25px;
}

.bottom-action-bar__back-button {
  cursor: pointer;
  border-radius: 3px;
  color: #fff;
  padding: 10px 20px 10px 14px;
  border: none;
  background-color: #64aeff;
  font-size: 12px;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  span {
    margin-left: 10px;
  }
}

.message {
  flex: 1;
  color: #fff;
  font-size: 12px;
  padding-left: 30px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  margin-left: 12px;
  display: none;
}

.alert-message {
  flex: 1;
  color: #fff;
  font-size: 12px;
  padding-right: 30px;
  text-align: right;
  display: none;
}

@media (min-width: 768px) {
  .message,
  .alert-message {
    display: inline-block;
  }
}

@media (min-width: 1024px) {
  .message,
  .alert-message {
    font-size: 14px;
  }
}
</style>
