<template>
  <el-table
    :data="orderList"
    empty-text="기록이 없습니다."
    row-class-name="members-list__row"
    fit
  >
    <el-table-column fixed="left" label="회사" min-width="80" align="center">
      <template v-slot="scope">
        <div class="members-list__name">
          {{ scope.row.userName }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="매입/매출"
      min-width="140"
      header-align="center"
      align="center"
    >
      <template v-slot="scope">
        <div class="members-list__phone">
          {{ scope.row.type ? "매입" : "매출" }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="거래일"
      min-width="140"
      header-align="center"
      align="center"
    >
      <template v-slot="scope">
        <div class="members-list__registered-at">
          {{ orderDate(scope.row.date) }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="제품명"
      min-width="140"
      header-align="center"
      align="center"
    >
      <template v-slot="scope">
        <div class="members-list__address">
          {{ scope.row.goods }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="가격"
      min-width="140"
      header-align="center"
      align="center"
    >
      <template v-slot="scope">
        <div class="members-list__address">{{ comma(scope.row.price) }}원</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    orderDate(date) {
      return this.$filters.date(date);
    },
    comma(value) {
      return this.$filters.comma(value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
