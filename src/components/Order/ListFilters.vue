<template>
  <div>
    <el-input
      v-model="keyword"
      placeholder="이름 또는 전화번호 입력하세요"
      @keyup.enter.native="handleChangeKeyword"
    ></el-input>

    <div class="div" :key="key.id" v-for="key in filterOptions">
      <el-select
        :multiple="filterOptions[key].multiple"
        :placeholder="filterOptions[key].placeholder"
        collapse-tags
        clearable
      >
        <el-option
          v-for="item in filterOptions[key].options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      {{ key }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterOptions: { type: Object }
  },

  data() {
    return {
      keyword: null
    };
  },

  methods: {
    handleChangeKeyword() {
      this.$store.dispatch("order/filterOrder", { keyword: this.keyword });
    }
  }
};
</script>

<style lang="scss" scoped></style>
