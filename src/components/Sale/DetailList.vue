<template>
  <el-card class="pie-chart" shadow="never">
    <div class="pie-chart__header">
      <h3>{{ title }}</h3>
      <div class="pie-chart__header__chart-resize" v-if="data.labels.length">
        <PieChart :chart-data="data" :options="pieOption" />
      </div>
    </div>

    <el-table :data="data.list" empty-text="데이터가 없습니다." fit>
      <el-table-column
        fixed="left"
        :label="title.slice(-6).slice(0, 3) === '회사별' ? '회사명' : '물품명'"
        min-width="80"
        align="center"
      >
        <template v-slot="scope">
          <div class="members-list__name">
            {{ scope.row.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="가격" min-width="80" align="center">
        <template v-slot="scope">
          <div class="members-list__name">
            {{ `${comma(scope.row.price)}원` }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="건수" min-width="80" align="center">
        <template v-slot="scope">
          <div class="members-list__name">
            {{ `${scope.row.count}건` }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PieChart from '@/components/Sale/PieChart.vue';

@Component({
  components: {
    PieChart,
  },
})
export default class DetailList extends Vue {
  @Prop() public title!: string;
  @Prop() public data!: object;
  @Prop() public pieOption!: object;

  comma(value: number): string {
    return this.$filters.comma(value);
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  min-height: 500px;
  max-height: 700px;
  width: 49%;
  overflow-y: auto;
  &__header {
    h3 {
      margin: 0 0 30px 0;
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &__chart-resize {
      height: 200px;
      width: 200px;
    }
  }
}
</style>
