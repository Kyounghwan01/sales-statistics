<template>
  <div class="filter-group">
    <div class="local-filter-group" :key="key" v-for="key in filterKeys">
      <el-select
        style="margin-right: 10px"
        v-if="key !== 'dateRange'"
        :value="filterValues[key]"
        @change="value => handleChangeFilter({ [key]: value })"
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

      <el-date-picker
        v-if="key === 'dateRange'"
        v-model="searchDateRange"
        type="daterange"
        range-separator="-"
        start-placeholder="시작일"
        end-placeholder="종료일"
        style="margin-right: 10px"
        format="yyyy. M. d."
        value-format="yyyyMMdd"
      >
      </el-date-picker>
    </div>

    <div class="name-filter">
      <el-input
        v-model="keyword"
        placeholder="이름 또는 전화번호"
        @keyup.enter.native="handleChangeKeyword"
      ></el-input>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    filterValues: Object,
    filterOptions: { type: Object }
  },

  data() {
    return {
      keyword: null,
      searchDateRange: [
        moment(new Date()).format("YYYYMMDD"),
        moment(new Date()).format("YYYYMMDD")
      ]
    };
  },

  computed: {
    filterKeys() {
      return ["dateRange", "companies", "soldType", "dateSort"];
    }
  },

  watch: {
    searchDateRange(value) {
      this.$store.commit("order/SET_FILTER", { dateRange: value });
    }
  },

  methods: {
    handleChangeKeyword() {
      this.$store.dispatch("order/filterOrder", { keyword: this.keyword });
      this.$store.commit("order/SET_FILTER", { keyword: this.keyword });
    },
    handleChangeFilter(values) {
      console.log(values);
      this.$store.commit("order/SET_FILTER", values);
      /**
       * 1. 필터 넣고
       * 2. 넣은 필터 기준 api 주소 만들고 데이터 받아서 commit("SET_FILTER_ORDERS", res.data.order);
       * 3. keyword 체크해서 없으면 그대로, 있으면 filterOrder 실행
       */
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-group {
  display: flex;
}
</style>
