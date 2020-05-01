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

<script>
export default {
  props: {
    value: { type: String, default: null },
    label: { type: String, default: null },
    labelNumber: { type: String, default: null },
    placeholder: { type: String, default: null },
    requireMessage: { type: String, default: null },
    require: { type: Boolean, default: null },
  },

  computed: {
    isHaveData() {
      if (this.require) return this.require;
      return null;
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    },
    formatContact(number) {
      if (!number) return;
      return number.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
    },
    validateKey(e) {
      const isNumber = !!e.key.replace(/\D/g, '');
      const isMaxLength = e.srcElement.value.replace(/-/g, '').length >= 11;
      if (!isNumber || isMaxLength) e.preventDefault();
    },
  },
};
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
