<template>
  <section>
    <div v-if="orderHistory && orderHistory.length">
      오더히드토리
      {{ orderHistory }}
      <!--  -->
    </div>
    <div v-else class="no-data">
      <span>거래 내역이 없습니다</span>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    orderHistory() {
      return this.$store.getters["users/currentUser"].order_history;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  height: 61vh;
  .no-data {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: NotoSansKR;
      font-size: 24px;
      color: #8a8a8a;
    }
  }
}
</style>
