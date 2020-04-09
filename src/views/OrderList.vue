<template>
  <MainLayout :padded="false">
    <section v-loading="loading">
      <h3>거래 현황</h3>
      <div class="total-comes">
        <span class="income">총 매입: {{ inComeOutCome.income }}</span>
        <span class="outcome">총 매출: {{ inComeOutCome.outcome }}</span>
      </div>

      <ListFilters @filter-change="values => setFilterValues(values)" />

      <List :orderList="orderList" />
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import ListFilters from "@/components/Order/ListFilters";
import List from "@/components/Order/List";

export default {
  components: {
    MainLayout,
    ListFilters,
    List
  },
  data() {
    return {
      // keyword: null
      // orderList: []
    };
  },
  updated() {
    // console.log(this.keyword);
  },
  async created() {
    const res = await this.$store.dispatch(
      "order/getOrderList",
      this.loginUser.id
    );

    if (res === "fail") {
      this.$store.dispatch("order/getOrderList");
    }
  },

  computed: {
    loginUser() {
      return this.$store.getters["loginUser/loginUser"];
    },
    loading() {
      return this.$store.getters["order/orderLoading"];
    },
    orderList() {
      return this.$store.getters["order/orders"];
    },
    inComeOutCome() {
      return this.$store.getters["order/countInComeOutCome"];
    }
  },
  methods: {
    setFilterValues(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="scss" scoped>
.outter {
  width: 100%;
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-user {
  height: 480px;
  width: 500px;
  border-radius: 10px;
}
.header {
  padding: 40px 0 25px 0;
  display: flex;
  justify-content: center;
  h3 {
    font-size: 25px;
    margin: 0;
  }
}

.login-button,
.register {
  padding: 20px;
  ::v-deep .el-button {
    width: 460px;
    height: 50px;
    color: white;
    font-weight: bold;
    font-size: 15px;
    background-color: rgba(dodgerblue, 0.8);
  }
  ::v-deep .el-button:hover {
    background-color: rgba(dodgerblue, 1);
  }
}
.padding-top {
  padding-top: 0px;
}

.id,
.password {
  .label-group {
    margin-bottom: 20px;
    label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  padding: 20px;
  ::v-deep .el-input {
    width: 460px;
  }
}
.error {
  border: 1px solid red;
  border-radius: 4px;
  ::v-deep .el-input__inner {
    border: none;
  }
}
.invalid-feedback {
  height: 15px;
  .required {
    color: red;
    margin-left: 5px;
    font-size: 13px;
  }
}
</style>
