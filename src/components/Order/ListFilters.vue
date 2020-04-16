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
        :clearable="false"
      >
      </el-date-picker>
    </div>

    <!-- <div class="name-filter">
      <el-input
        v-model="keyword"
        placeholder="이름 또는 전화번호"
        @keyup.enter.native="handleChangeKeyword"
      ></el-input>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    filterValues: Object,
    filterOptions: { type: Object }
  },

  data() {
    return {
      keyword: null
    };
  },

  computed: {
    loginUser() {
      return this.$store.getters["loginUser/loginUser"];
    },

    filterKeys() {
      if (this.$route.name === "orders_list") {
        return ["dateRange", "companies", "soldType", "dateSort"];
      }
      return ["dateRange", "soldType", "dateSort"];
    },

    searchDateRange: {
      get() {
        return this.$store.getters["order/filter"].dateRange;
      },
      set(range) {
        this.$store.dispatch("order/getOrderFilterList", { dateRange: range });
      }
    }
  },

  methods: {
    handleChangeKeyword() {
      this.$store.dispatch("order/filterOrder", { keyword: this.keyword });
      this.$store.commit("order/SET_FILTER", { keyword: this.keyword });
    },
    handleChangeFilter(values) {
      this.$store.dispatch("order/getOrderFilterList", values);
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-group {
  display: flex;
}
</style>
