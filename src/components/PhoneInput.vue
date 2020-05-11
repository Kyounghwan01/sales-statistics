<template>
  <div class="container">
    <div class="label-group">
      <label>{{ labelNumber }}</label>
      <label>{{ label }}</label>
    </div>
    <div class="input-group">
      <el-input
        v-bind="$attrs"
        :placeholder="placeholder"
        :value="formatContact(value)"
        @input="value => $emit('input', value.replace(/-/g, ''))"
        @keypress.native="validateKey"
      >
      </el-input>
    </div>
    <div class="invalid-feedback">
      <span class="required" v-if="!isHaveData">{{ requireMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PhoneInput extends Vue {
  @Prop() public value!: { type: string; default: null };
  @Prop() public label!: { type: string; default: null };
  @Prop() public labelNumber!: { type: string; default: null };
  @Prop() public placeholder!: { type: string; default: null };
  @Prop() public requireMessage!: { type: string; default: null };
  @Prop() public require!: { type: boolean; default: false };

  get isHaveData() {
    if (this.require) return this.require;
    return null;
  }

  handleInput(value: number): void {
    this.$emit('input', value);
  }
  formatContact(number: string): string | void {
    if (number) {
      return number.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateKey(e: any) {
    const isNumber = !!e.key.replace(/\D/g, '');
    const isMaxLength = e.srcElement.value.replace(/-/g, '').length >= 11;
    if (!isNumber || isMaxLength) e.preventDefault();
  }
}
</script>

<style lang="scss" scoped>
.container {
  .label-group {
    margin-bottom: 20px;
    label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .input-group {
    margin-left: 30px;
  }
  border-bottom: 1px solid #eee;
  padding: 35px;
}

.invalid-feedback {
  height: 15px;
  .required {
    color: red;
    margin-left: 30px;
    font-size: 13px;
  }
}
</style>
