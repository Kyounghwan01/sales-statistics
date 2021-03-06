<template>
  <MainLayout :padded="false" v-loading="loading">
    <section>
      <div class="header">
        <div class="header__name-group">
          <h3 class="header__name">{{ currentUserData.name }}</h3>
          <PlainButton class="update-button" @click="goToUserEdit">회원 정보 수정</PlainButton>
        </div>
        <div class="header__content-group">
          <div class="reg-date">등록일 : {{ formRegistreDate }}</div>
          <div class="phone">핸드폰번호 : {{ formatMobile }}</div>
          <div class="address">주소 : {{ currentUserData.address }}</div>
          <div class="content">
            메모 :
            {{ currentUserData.content ? currentUserData.content : '메모가 없습니다' }}
          </div>
        </div>
      </div>
      <div class="body">
        <Tabs :tabs="tabs" :activeName="currentTab" :changeTabs="changeTabs" />
        <OrderHistory v-if="currentTab === 'history'" :changeTabs="changeTabs" />
        <OrderCreate v-if="currentTab === 'writeTrade'" :userName="currentUserData.name" :changeTabs="changeTabs" />
      </div>
    </section>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainLayout from '@/router/layouts/MainLayout.vue';
import PlainButton from '@/components/PlainButton.vue';
import OrderCreate from '@/components/Order/OrderCreate.vue';
import OrderHistory from '@/components/Order/OrderHistory.vue';
import Tabs from '@/components/Tabs.vue';
import moment from 'moment';

@Component({
  components: {
    MainLayout,
    PlainButton,
    Tabs,
    OrderCreate,
    OrderHistory,
  },
})
export default class MemberDetail extends Vue {
  public loading = false;
  public currentTab = 'history';
  public tabs: { value: string; label: string }[] = [
    { value: 'history', label: '거래내역' },
    { value: 'writeTrade', label: '거래작성' },
  ];

  get formRegistreDate(): string {
    return moment(this.currentUserData.registreDate).format('YYYY년 M월 D일');
  }

  get currentUserData(): { registreDate: string; phone: string } {
    return this.$store.getters['users/currentUser'];
  }

  get formatMobile(): string {
    return this.$filters.mobile(this.currentUserData.phone);
  }

  async created(): Promise<void> {
    this.loading = true;
    const params = {
      companyUid: this.$route.query.uid,
      id: this.$route.params.id,
    };
    const res = await this.$store.dispatch('users/getCurrentUser', params);

    if (res === 'fail') {
      this.$message({ showClose: true, message: '회원 정보 로딩 실패 다시 접속하세요' });
      this.$router.push('/users');
    }

    this.loading = false;
  }

  @Watch('currentTab', { immediate: true })
  resetOrderData(value: string): void {
    if (value === 'history') {
      this.$store.commit('editOrder/SET_RESET_ORDER_DATA');
    }
  }

  goToUserEdit() {
    const id = this.$route.params.id;

    this.$router.push({
      path: `/users/edit/${id}`,
      query: { ...this.currentUserData },
    });
  }

  changeTabs(tabName: string): void {
    this.currentTab = tabName;
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 160px;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  border-bottom: 2px solid rgba(gray, 0.15);
  &__name-group {
    display: flex;
  }
  &__update {
    border: 1px solid #4799f2;
    border-radius: 15px;
    color: #4799f2;
    font-size: 14px;
    padding: 4px 8px;
    transition: background 0.15s;
    height: 30px;
  }
  &__name {
    font-size: 40px;
    max-width: 400px;
  }
  &__content-group {
    margin-top: 10px;
    div {
      margin: 10px;
    }
  }
}
.update-button {
  height: 30px;
  line-height: 0px;
  font-size: 12px;
  position: relative;
  top: 50px;
  margin-left: 30px;
}
.body {
  padding: 0 160px;
  position: relative;
  bottom: 40px;
  height: 69vh;
}
</style>
