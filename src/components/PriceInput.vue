<template>
  <el-input
    v-bind="$attrs"
    type="text"
    @keypress.native="validateKey"
    :value="formattedValue"
    @input="
      value => {
        handleInput(value);
      }
    "
  >
    <span slot="suffix">{{ unit }}</span>
  </el-input>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PriceInput extends Vue {
  @Prop() public value!: string;
  @Prop() public unit!: string;

  get formattedValue(): string {
    return this.$filters.comma(parseInt(this.value));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateKey(e: any) {
    if (!e.key.replace(/\D/g, '')) e.preventDefault();
  }

  handleInput(value: string) {
    const filtered = Number(value.replace(/\D/g, ''));
    this.$emit('input', filtered);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  text-align: right;
}

::v-deep .el-input__suffix {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
}
</style>
