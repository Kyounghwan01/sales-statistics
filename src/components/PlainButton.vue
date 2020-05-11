<template>
  <button v-bind="$attrs" :class="[type, size, round ? 'round' : null]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PlainButton extends Vue {
  @Prop() public type!: string;
  @Prop() public size!: string;
  @Prop() public round!: { type: boolean; default: false };
}
</script>

<style lang="scss" scoped>
button {
  border: solid 1px dodgerblue;
  border-radius: 2px;
  color: dodgerblue;
  font-size: 14px;
  padding: 4px 8px;
  transition: background 0.15s;

  &.round {
    border-radius: 13px;
  }

  &:hover {
    background: rgba(dodgerblue, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
      background: transparent !important;
    }
  }

  &.danger {
    border-color: red;
    color: red;

    &:hover {
      background: rgba(red, 0.1);
    }
  }

  &.white {
    border-color: #fff;
    color: #fff;

    &:hover {
      background: rgba(#fff, 0.1);
    }
  }

  &.info {
    border-color: #606266;
    color: #606266;

    &:hover {
      background: rgba(#606266, 0.1);
    }
  }

  &.large {
    border-radius: 4px;
    font-size: 14px;
    padding: 7px 14px;

    &.round {
      border-radius: 16px;
    }
  }

  &.xlarge {
    border-radius: 8px;
    font-size: 16px;
    padding: 9px 18px;
  }

  &.small {
    padding: 2px 4px;
  }
}
</style>
