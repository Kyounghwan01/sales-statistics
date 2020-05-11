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
      <List v-loading="loading" :orderList="orders" :changeTabs="changeTabs" />
      <el-pagination
        style="text-align: center; margin-top: 10px;"
        layout="prev, pager, next"
        :current-page.sync="pageParams.page + 1"
        @current-change="handleCurrentChange"
        :page-size="pageParams.limit"
        :total="pageParams.total"
      >
      </el-pagination>
    </div>
    <div v-else class="no-data">
      <span>거래 내역이 없습니다</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ListFilters from '@/components/Order/ListFilters.vue';
import List from '@/components/Order/List.vue';

interface ResType {
  status: number;
  message: string;
}

@Component({
  components: {
    ListFilters,
    List,
  },
})
export default class OrderHistory extends Vue {
  @Prop() public changeTabs!: (text: string) => void;

  public orderLoading = false;
  public page = 0;
  public limit = 10;

  get orders(): string[] {
    return this.$store.getters['order/orders'];
  }

  get filters(): object {
    return this.$store.getters['order/filter'];
  }

  get pageParams(): object {
    return this.$store.getters['order/pageParams'];
  }

  get loading(): string {
    return this.$store.getters['order/orderLoading'];
  }

  get filterOptions() {
    return {
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

  get inComeOutCome() {
    return this.$store.getters['order/countInComeOutCome'];
  }

  async created() {
    this.orderLoading = true;
    this.$store.commit('order/SET_FILTER', {
      companies: [Number(this.$route.params.id)],
    });

    const res: ResType = await this.$store.dispatch('order/getOrderList');
    if (res.message === 'success') {
      this.orderLoading = false;
    } else {
      this.orderLoading = false;
      this.$router.push('/users');
      this.$message({ showClose: true, message: '회원 정보 로딩 실패 다시 접속하세요' });
    }
  }

  async handleCurrentChange(value: number): Promise<void> {
    const params = { ...this.pageParams, page: value - 1 };
    await this.$store.commit('order/SET_PAGE_PARAMS', params);
    this.$store.dispatch('order/getOrderList', this.pageParams);
  }
}
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
