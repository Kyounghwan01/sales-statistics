<template>
  <el-table
    :data="orderList"
    empty-text="주문 기록이 없습니다."
    row-class-name="members-list__row"
    @cell-click="handleCellClick"
    fit
  >
    <el-table-column label="매입/매출" min-width="80" fixed="left" header-align="center" align="center">
      <template v-slot="scope">
        <div class="members-list__phone">
          {{ scope.row.type ? '매입' : '매출' }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="회사" min-width="100" align="center">
      <template v-slot="scope">
        <div class="members-list__name">
          {{ scope.row.userName }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="거래일" min-width="140" header-align="center" align="center">
      <template v-slot="scope">
        <div class="members-list__registered-at">
          {{ orderDate(scope.row.date) }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="제품명" min-width="140" header-align="center" align="center">
      <template v-slot="scope">
        <div class="members-list__address">
          {{ scope.row.goods }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="가격" min-width="140" header-align="center" align="center">
      <template v-slot="scope">
        <div class="members-list__address">{{ comma(scope.row.price) }}원</div>
      </template>
    </el-table-column>

    <el-table-column label="메모" min-width="140" header-align="center" align="center">
      <template v-slot="scope">
        <div class="members-list__address">
          {{ scope.row.memo }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class List extends Vue {
  @Prop() public orderList!: string[];
  @Prop() public changeTabs!: (text: string) => void;

  orderDate(date: string): string {
    return this.$filters.date(date);
  }

  comma(value: number): string {
    return this.$filters.comma(value);
  }

  handleCellClick(row: { userId: string; companyUid: string }): void {
    if (this.$route.name === 'detail_user') {
      this.$store.commit('editOrder/SET_CREATE_ORDER_DATA', row);
      return this.changeTabs('writeTrade');
    }

    this.$router.push(`/users/${row.userId}?uid=${row.companyUid}`);
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  /deep/ .members-list__row {
    cursor: pointer;
  }
}
</style>
