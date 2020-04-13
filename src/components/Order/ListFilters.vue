<template>
  <div>
    <el-input
      v-model="keyword"
      placeholder="이름 또는 전화번호 입력하세요"
      @keyup.enter.native="handleChangeKeyword"
    ></el-input>

    <div class="div" :key="key" v-for="key in filterKeys">
      <el-select
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
      <!-- {{ key }} -->
    </div>
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

  // updated() {
  //   console.log("asd", this.filterValues);
  // },

  computed: {
    filterKeys() {
      return [
        "companies",
        "others"
        // "timeRange",
        // "instructors",
        // "courseType",
        // "divisions"
      ];
    }
  },

  methods: {
    handleChangeKeyword() {
      this.$store.dispatch("order/filterOrder", { keyword: this.keyword });
    },
    handleChangeFilter(values) {
      this.$store.commit("order/SET_FILTER", values);
    }
  }
};
</script>

<style lang="scss" scoped></style>
