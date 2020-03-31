<template>
  <div>
    <el-input
      v-model="keyword"
      placeholder="이름 또는 전화번호 입력하세요"
      @keyup.enter.native="handleChangeKeyword"
    ></el-input>
    <!-- <div class="lecture-list-filter__query-type">
      <el-select v-model="queryType">
        <el-option
          v-for="item in rangeTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: null
    };
  },
  methods: {
    handleChangeKeyword() {
      this.$store.dispatch("order/filterOrder", this.keyword);
    }
  }
};
</script>

<style lang="scss" scoped></style>
