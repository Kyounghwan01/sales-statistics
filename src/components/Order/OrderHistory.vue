<template>
  <section v-loading="orderLoading">
    <div v-if="orders.length">
      {{ orders }}
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
      orderLoading: false,
      page: 0,
      limit: 10
    };
  },
  async created() {
    this.orderLoading = true;
    const res = await this.$store.dispatch("order/getOrdersByUser", {
      id: Number(this.$route.params.id),
      page: this.page,
      limit: this.limit
    });
    if (res === "success") {
      this.orderLoading = false;
    } else {
      this.orderLoading = false;
      this.$router.push("/users");
      this.$message("회원 정보 로딩 실패 다시 접속하세요");
    }
  },

  computed: {
    orders() {
      return this.$store.getters["order/orders"];
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
