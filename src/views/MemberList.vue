<template>
  <MainLayout :padded="false">
    <section class="user-list">
      <div class="user-list__header">
        <h3>고객 관리</h3>
        <div class="search-box">
          <el-input
            v-model="keyword"
            placeholder="이름 또는 전화번호 입력하세요"
          ></el-input>
          <div class="total">총 : {{ userList.length }} 명</div>
        </div>
      </div>
      <MembersList :users="userList" v-loading="loading" />
      <AddButton @click="$router.push('/users/create')" />
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import MembersList from "@/components/Members/List";
import AddButton from "@/components/AddButton";

export default {
  components: {
    MainLayout,
    MembersList,
    AddButton
  },
  props: {
    msg: String
  },
  data() {
    return {
      userData: [
        {
          name: "nkh",
          phone: "01022349891",
          address: "신장동",
          registeredAt: "1993-01-23"
        }
      ],
      keyword: null
    };
  },
  async created() {
    await this.$store.dispatch("users/getUser");
  },
  computed: {
    memberList() {
      return this.$store.getters["members/member"];
    },
    userList() {
      return this.$store.getters["users/user"];
    },
    loading() {
      return this.$store.getters["users/userLoading"];
    }
  },
  watch: {
    keyword: function() {
      this.$store.dispatch("users/filterUser", this.keyword);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  padding: 10px 80px;
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
      /deep/ .el-input__inner {
        border-radius: 80px;
        width: 200px;
      }
    }
    .total {
      width: 100px;
      font-size: 18px;
      line-height: 40px;
    }
  }
}
</style>
