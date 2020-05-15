<template>
  <MainLayout :padded="false">
    <section class="user-list">
      <div class="user-list__header">
        <h3>회사 관리</h3>
        <div class="search-box">
          <el-input v-model="keyword" placeholder="이름 또는 전화번호 입력하세요"></el-input>
          <div class="total">
            총 : <b>{{ userList.length }}</b> 명
          </div>
        </div>
      </div>
      <MembersList :users="userList" v-loading="!userList.length" :companyUid="loginUser.id" />
      <AddButton @click="$router.push('/users/create')" />
    </section>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainLayout from '@/router/layouts/MainLayout.vue';
import MembersList from '@/components/Members/List.vue';
import AddButton from '@/components/AddButton.vue';

@Component({
  components: {
    MainLayout,
    MembersList,
    AddButton,
  },
})
export default class MemberList extends Vue {
  public keyword = null;

  get loginUser(): { id: string } {
    return this.$store.getters['loginUser/loginUser'];
  }

  get userList(): object {
    if (!this.$store.getters['users/user']) {
      this.$store.dispatch('users/getUser', this.loginUser.id);
    }
    return this.$store.getters['users/user'];
  }

  @Watch('keyword', { immediate: true })
  filterForKeyword(value: string): void {
    this.$store.dispatch('users/filterUser', value);
  }

  @Watch('loginUser', { immediate: true })
  getLoginUser(): void {
    this.$store.dispatch('users/getUser', this.loginUser.id);
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  padding: 10px 80px;
  overflow-y: auto;
  height: 85vh;
  &__header {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: normal;
      margin: 15px;
    }
    .search-box {
      display: flex;
      width: 300px;
      padding-right: 30px;
      border-radius: 14px;
      ::v-deep .el-input__inner {
        border-radius: 80px;
        width: 200px;
      }
    }
    .total {
      width: 100px;
      line-height: 40px;
      font-family: NotoSansKR;
      font-size: 18px;
      color: #8a8a8a;
    }
  }
}
</style>
