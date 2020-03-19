<template>
  <section v-loading="orderLoading">
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
  data() {
    return {
      orderLoading: false
    };
  },
  async created() {
    this.orderLoading = true;
    const res = await this.$store.dispatch("order/getOrders", {
      id: Number(this.$route.params.id),
      page: 0,
      limit: 10
    });
    console.log(res);
    // if (res.status === 200) {
    //   this.orderLoading = false;
    // } else {
    //   //       this.$router.push(`/users/${row.id}`);

    //   console.log("Asd");
    //   this.orderLoading = false;
    // }
  },
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
