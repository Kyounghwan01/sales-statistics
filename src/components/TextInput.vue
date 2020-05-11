<template>
  <div class="container">
    <div class="label-group">
      <label>{{ labelNumber }}</label>
      <label>{{ label }}</label>
    </div>
    <div class="input-group">
      <el-input
        v-bind="$attrs"
        v-if="type === 'text'"
        :placeholder="placeholder"
        :value="this.value"
        @input="value => $emit('input', value)"
      >
      </el-input>

      <el-date-picker
        v-bind="$attrs"
        v-if="type === 'date'"
        :type="type"
        :placeholder="placeholder"
        format="yyyy년 M월 d일"
        value-format="yyyy-MM-dd"
        :clearable="false"
        :value="this.value"
        @input="value => $emit('input', value)"
      >
      </el-date-picker>
    </div>
    <div class="invalid-feedback">
      <span class="required" v-if="!isHaveData">{{ requireMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TextInput extends Vue {
  @Prop() public value!: { type: string; default: null };
  @Prop() public label!: { type: string; default: null };
  @Prop() public labelNumber!: { type: string; default: null };
  @Prop() public placeholder!: { type: string; default: null };
  @Prop() public requireMessage!: { type: string; default: null };
  @Prop() public require!: { type: boolean; default: false };
  @Prop() public type!: { type: string; default: 'text' };

  get isHaveData() {
    if (this.require) return this.require;
    return null;
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
