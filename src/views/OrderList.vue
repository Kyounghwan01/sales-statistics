<template>
  <MainLayout :padded="false">
    <section class="order-list">
      <div class="order-list__header">
        <h3>거래 현황</h3>
        <div class="order-list__header__content">
          <div class="order-list__header__content__total-comes">
            <span class="order-list__header__content__total-comes__outcome"
              >총 매출: <b>{{ inComeOutCome.outcome }}</b> 원</span
            >
            <span class="order-list__header__content__total-comes__income"
              >총 매입: <b>{{ inComeOutCome.income }}</b> 원</span
            >
          </div>
          <div class="order-list__header__content__excel-button-group">
            <PlainButton class="update-button" @click="downloadExcel(orderList)">필터 목록 다운로드</PlainButton>
            <PlainButton class="update-button" @click="entireDownloadExcel">전체 목록 다운로드</PlainButton>
          </div>
        </div>
      </div>

      <ListFilters v-loading="loading" :filterOptions="filterOptions" :filterValues="filters" />

      <List v-loading="loading" :orderList="orderList" />

      <el-pagination
        style="text-align: center; margin-top: 10px;"
        layout="prev, pager, next"
        :current-page.sync="pageParams.page + 1"
        @current-change="handleCurrentChange"
        :page-size="pageParams.limit"
        :total="pageParams.total"
      >
      </el-pagination>
    </section>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from '@/router/layouts/MainLayout.vue';
import ListFilters from '@/components/Order/ListFilters.vue';
import List from '@/components/Order/List.vue';
import PlainButton from '@/components/PlainButton.vue';
import moment from 'moment';

@Component({
  components: {
    MainLayout,
    ListFilters,
    List,
    PlainButton,
  },
})
export default class OrderList extends Vue {
  public companies = [];
  public filterValues = {};

  get loginUser(): { id: string } {
    return this.$store.getters['loginUser/loginUser'];
  }

  get loading(): boolean {
    return this.$store.getters['order/orderLoading'];
  }

  get orderList(): object {
    return this.$store.getters['order/orders'];
  }

  get pageParams(): { page: number; limit: number; total: number } {
    return this.$store.getters['order/pageParams'];
  }

  get inComeOutCome(): { outcome: number; income: number } {
    return this.$store.getters['order/countInComeOutCome'];
  }

  get filterOptions(): object {
    // TODO: 기간내 매출/매입 리스트가 있는 회사만 가져오기
    const companiesOptions = this.companies.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
    return {
      companies: {
        multiple: true,
        placeholder: '모든 회사',
        options: companiesOptions,
      },
      soldType: {
        multiple: false,
        placeholder: '매출/매입',
        options: [
          {
            value: false,
            label: '매출',
          },
          {
            value: true,
            label: '매입',
          },
        ],
      },
      dateSort: {
        multiple: false,
        placeholder: '최신순',
        options: [
          {
            value: 1,
            label: '과거순',
          },
          {
            value: 0,
            label: '최신순',
          },
        ],
      },
    };
  }
  get filters(): object {
    return this.$store.getters['order/filter'];
  }

  async created(): Promise<void> {
    const res = await this.$store.dispatch('order/getOrderList', this.pageParams);

    if (res.message === 'fail') {
      this.$store.dispatch('order/getOrderList');
    }

    this.getCompanies();
  }

  async getCompanies(): Promise<void> {
    if (!this.$store.getters['users/user'].length) {
      await this.$store.dispatch('users/getUser', this.loginUser.id);
    }

    this.companies = this.$store.getters['users/user'];
  }

  downloadExcel(data: object): void {
    this.$store.commit('order/SET_ORDER_LOADING', true);
    const res = this.$utils.excel.formatJSON(data);
    const title = `데이터목록_${moment().format('YYYYMMDD_HHmm')}.xlsx`;

    this.$utils.excel.excelDownload(res, title);
    this.$store.commit('order/SET_ORDER_LOADING', false);
  }

  async entireDownloadExcel(): Promise<void> {
    const res = await this.$api.order.getOrderForExcel(this.loginUser.id);
    this.downloadExcel(res.data.order);
  }

  async handleCurrentChange(value: number): Promise<void> {
    const params = { ...this.pageParams, page: value - 1 };
    await this.$store.commit('order/SET_PAGE_PARAMS', params);
    this.$store.dispatch('order/getOrderList', this.pageParams);
  }
}
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
    &__content {
      display: flex;
      margin-left: 10px;
      &__total-comes {
        display: flex;
        flex-direction: column;
        margin: 10px 10px 0 0;
        &__income {
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

      &__excel-button-group {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        button {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
