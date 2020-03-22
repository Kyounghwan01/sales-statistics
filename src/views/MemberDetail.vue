<template>
  <MainLayout :padded="false" v-loading="loading">
    <section>
      <div class="header">
        <div class="header__name-group">
          <h3 class="header__name">{{ currentUserData.name }}</h3>
          <PlainButton class="update-button" @click="goToUserEdit"
            >회원 정보 수정</PlainButton
          >
        </div>
        <div class="header__content-group">
          <div class="reg-date">등록일 : {{ formRegistreDate }}</div>
          <div class="phone">핸드폰번호 : {{ currentUserData.phone }}</div>
          <div class="address">주소 : {{ currentUserData.address }}</div>
          <div class="content">
            메모 :
            {{
              currentUserData.content
                ? currentUserData.content
                : "메모가 없습니다"
            }}
          </div>
        </div>
      </div>
      <div class="body">
        <Tabs :tabs="tabs" :activeName="currentTab" :changeTabs="changeTabs" />
        <OrderHistory
          v-if="currentTab === 'history'"
          :changeTabs="changeTabs"
        />
        <OrderCreate v-if="currentTab === 'writeTrade'" />
      </div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout.vue";
import PlainButton from "@/components/PlainButton.vue";
import OrderCreate from "@/components/Order/OrderCreate";
import OrderHistory from "@/components/Order/OrderHistory";
import Tabs from "@/components/Tabs.vue";
export default {
  components: {
    MainLayout,
    PlainButton,
    Tabs,
    OrderCreate,
    OrderHistory
  },
  data() {
    return {
      user: {
        _id: "5e68b9c3c386940008869c2a",
        name: "awdawdawdawdawd",
        content: null,
        address: "경기하남",
        registreDate: '2020-03-25"',
        phone: "010-2234-9891",
        id: 38,
        lastDate: "2020-03-11T10:13:23.430Z"
      },
      loading: false,
      currentTab: "history",
      tabs: [
        { value: "history", label: "거래내역" },
        { value: "writeTrade", label: "거래작성" }
      ]
    };
  },

  async created() {
    this.loading = true;

    const res = await this.$store.dispatch(
      "users/getCurrentUser",
      this.$route.params.id
    );

    if (res === "fail") {
      this.$message("회원 정보 로딩 실패 다시 접속하세요");
      this.$router.push("/users");
    }

    this.loading = false;
  },

  computed: {
    formRegistreDate() {
      return this.moment(this.currentUserData.registreDate).format(
        "YYYY년 M월 D일"
      );
    },
    currentUserData() {
      return this.$store.getters["users/currentUser"];
    }
  },
  // watch: {
  //   currentTab: function(value) {
  //     console.log(value);
  //   }
  // },

  methods: {
    goToUserEdit() {
      const id = this.$route.params.id;

      this.$router.push({
        path: `/users/edit/${id}`,
        query: { ...this.currentUserData }
      });
    },
    changeTabs(tabName) {
      this.currentTab = tabName;
    }
  }
};
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
