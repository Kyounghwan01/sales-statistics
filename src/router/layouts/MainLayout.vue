<template>
  <div>
    <MainHeader class="main__header" />
    <section class="main__contents" :class="{ padded }">
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
import MainHeader from '../../components/MainHeader/index.vue';

export default {
  components: { MainHeader },

  props: {
    padded: { type: Boolean, default: true },
    borderTop: { type: String },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 99vw;
  height: 99vh;
  overflow: hidden;

  &__header {
    grid-area: header;

    &__error {
      background: #fef0f0;
      color: red;
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  &__notification {
    grid-area: notification;
  }

  &__contents {
    position: relative;
    overflow-y: auto;
    grid-area: contents;

    &.padded {
      padding: 10px;
    }
  }
}
</style>
