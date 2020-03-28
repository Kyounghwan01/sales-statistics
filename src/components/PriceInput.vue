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

<script>
export default {
  props: {
    value: Number,
    unit: String
  },
  computed: {
    formattedValue() {
      return this.$filters.comma(parseInt(this.value));
    }
  },
  methods: {
    validateKey(e) {
      if (!e.key.replace(/\D/g, "")) e.preventDefault();
    },
    handleInput(value) {
      const filtered = Number(value.replace(/\D/g, ""));
      this.$emit("input", filtered);
    }
  }
};
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
