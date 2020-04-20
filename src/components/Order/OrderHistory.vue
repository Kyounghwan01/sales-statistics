<template>
  <section v-loading="orderLoading">
    <div class="total-comes">
      <span class="total-comes__outcome"
        >매출: <b>{{ inComeOutCome.outcome }}</b> 원</span
      >
      <span class="total-comes__income"
        >매입: <b>{{ inComeOutCome.income }}</b> 원</span
      >
    </div>
    <ListFilters :filterOptions="filterOptions" :filterValues="filters" />
    <div v-if="orders.length" class="have-data">
      <List :orderList="orders" :changeTabs="changeTabs" />
    </div>
    <div v-else class="no-data">
      <span>거래 내역이 없습니다</span>
    </div>
  </section>
</template>

<script>
import ListFilters from "@/components/Order/ListFilters";
import List from "@/components/Order/List";

export default {
  components: {
    ListFilters,
    List
  },

  props: {
    changeTabs: Function
  },

  data() {
    return {
      orderLoading: false,
      page: 0,
      limit: 10
    };
  },

  async created() {
    this.orderLoading = true;
    this.$store.commit("order/SET_FILTER", {
      companies: [Number(this.$route.params.id)]
    });

    const res = await this.$store.dispatch("order/getOrderList");
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
    },
    filters() {
      return this.$store.getters["order/filter"];
    },
    filterOptions() {
      return {
        soldType: {
          multiple: false,
          placeholder: "매출/매입",
          options: [
            {
              value: false,
              label: "매출"
            },
            {
              value: true,
              label: "매입"
            }
          ]
        },
        dateSort: {
          multiple: false,
          placeholder: "최신순",
          options: [
            {
              value: 1,
              label: "과거순"
            },
            {
              value: 0,
              label: "최신순"
            }
          ]
        }
      };
    },
    inComeOutCome() {
      return this.$store.getters["order/countInComeOutCome"];
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  height: 61vh;
  .total-comes {
    text-align: right;
    &__income {
      margin-left: 10px;
      b {
        color: red;
      }
    }
    &__outcome {
      b {
        color: dodgerblue;
      }
    }
  }
  .have-data {
    margin-top: 10px;
  }
  .no-data {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    span {
      font-family: NotoSansKR;
      font-size: 24px;
      color: #8a8a8a;
    }
  }
}
</style>
