<template>
  <MainLayout :padded="false">
    <section class="order-list" v-loading="loading">
      <div class="order-list__header">
        <h3>거래 현황</h3>
        <div class="order-list__header__total-comes">
          <span class="income">총 매입: {{ inComeOutCome.income }}</span>
          <span class="outcome">총 매출: {{ inComeOutCome.outcome }}</span>
        </div>
      </div>

      <ListFilters
        :filterOptions="filterOptions"
        @filter-change="values => setFilterValues(values)"
      />

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
      companies: []
      // keyword: null
      // orderList: []
    };
  },

  async created() {
    const res = await this.$store.dispatch(
      "order/getOrderList",
      this.loginUser.id
    );

    if (res === "fail") {
      this.$store.dispatch("order/getOrderList");
    }

    this.getCompanies();
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
    },

    filterOptions() {
      //회사 리스트만 필요한데,
      const companiesOptions = this.companies;
      return {
        companies: {
          multuple: false,
          placeholder: "모든 회사",
          options: companiesOptions
        }
      };
    }
  },

  methods: {
    setFilterValues(value) {
      console.log(value);
    },

    async getCompanies() {
      if (!this.$store.getters["users/user"].length) {
        await this.$store.dispatch("users/getUser", this.loginUser.id);
      }

      this.companies = this.$store.getters["users/user"];
    }
  }
};
</script>
<style lang="scss" scoped>
.order-list {
  padding: 10px 200px;
  overflow-y: auto;
  height: 85vh;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 65px;
    &__total-comes {
      display: flex;
      flex-direction: column;
      margin: 10px 0;
    }
  }
}
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
