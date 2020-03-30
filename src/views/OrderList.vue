<template>
  <MainLayout :padded="false">
    <section v-loading="loading">
      <el-table
        :data="orderList"
        empty-text="기록이 없습니다."
        row-class-name="members-list__row"
        fit
      >
        <el-table-column
          fixed="left"
          label="이름"
          min-width="80"
          align="center"
        >
          <template v-slot="scope">
            <div class="members-list__name">
              {{ scope.row.userId }}
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
      </el-table>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";

export default {
  components: {
    MainLayout
  },
  data() {
    return {
      orderList: [],
      loading: false
    };
  },
  async created() {
    this.loading = true;
    const res = await this.$api.order.getOrderAll();
    console.log(res);
    this.orderList = res.data;
    console.log(this.orderList);
    this.loading = false;
  },
  methods: {
    orderDate(date) {
      return this.$filters.date(date);
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
