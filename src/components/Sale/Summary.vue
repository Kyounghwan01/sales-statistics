<template>
  <div class="sales-summary">
    <div v-for="el in barChartDataSet.total" :key="el.label" class="sales-summary__card">
      <el-card shadow="never">
        <h4>{{ el.label }}</h4>
        <div class="sales-summary__card__context">
          <span
            ><b>{{ comma(el.price) }}</b
            >원</span
          >
          <span
            ><b>{{ comma(el.count) }}</b
            >건</span
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barChartDataSet: { type: Object },
  },

  methods: {
    comma(value) {
      return this.$filters.comma(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.sales-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 25px;

  &__card {
    h4 {
      margin: 0 0 5px 0;
    }
    &__context {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
