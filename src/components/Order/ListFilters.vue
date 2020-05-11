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
        <el-option v-for="item in filterOptions[key].options" :key="item.value" :label="item.label" :value="item.value">
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
    <el-tooltip v-if="$route.name === 'detail_user'" class="item" effect="light" placement="right-start">
      <p slot="content">
        리스트를 누르면 해당 주문 정보를 수정 / 삭제 할 수 있습니다.
      </p>
      <i class="el-icon-question" :style="{ color: '#64AEFF', fontSize: '18px' }"></i>
    </el-tooltip>

    <!-- <div class="name-filter">
      <el-input
        v-model="keyword"
        placeholder="이름 또는 전화번호"
        @keyup.enter.native="handleChangeKeyword"
      ></el-input>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ListFilters extends Vue {
  @Prop() public filterValues!: object;
  @Prop() public filterOptions!: object;

  public keyword = null;

  get loginUser(): object {
    return this.$store.getters['loginUser/loginUser'];
  }

  get filterKeys(): string[] {
    if (this.$route.name === 'orders_list') {
      return ['dateRange', 'companies', 'soldType', 'dateSort'];
    }
    return ['dateRange', 'soldType', 'dateSort'];
  }

  get searchDateRange(): string {
    return this.$store.getters['order/filter'].dateRange;
  }
  set searchDateRange(range: string) {
    this.$store.dispatch('order/getOrderFilterList', { dateRange: range });
  }

  handleChangeKeyword() {
    this.$store.dispatch('order/filterOrder', { keyword: this.keyword });
    this.$store.commit('order/SET_FILTER', { keyword: this.keyword });
  }

  handleChangeFilter(values: object) {
    this.$store.dispatch('order/getOrderFilterList', values);
  }
}
</script>

<style lang="scss" scoped>
.filter-group {
  display: flex;
}
.item {
  line-height: 2;
}
</style>
