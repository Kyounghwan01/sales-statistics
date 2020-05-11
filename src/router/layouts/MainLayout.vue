<template>
  <div>
    <MainHeader class="main__header" />
    <section class="main__contents" :class="{ padded }">
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MainHeader from '@/components/MainHeader/index.vue';

@Component({
  components: {
    MainHeader,
  },
})
export default class MainLayout extends Vue {
  @Prop() public padded!: { type: boolean; default: true };
  @Prop() public borderTop!: { type: string };
}
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
