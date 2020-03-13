<template>
  <MainLayout :padded="false" v-loading="loading">
    <section>
      <div class="header">
        <div class="header__name-group">
          <h3 class="header__name">{{ user.name }}</h3>
          <PlainButton class="update-button" @click="goToUserEdit"
            >회원 정보 수정</PlainButton
          >
          <!-- <el-button class="header__update">회원 정보 수정</el-button> -->
        </div>
        <div class="header__content-group">
          <div class="reg-date">등록일 : {{ formRegistreDate }}</div>
          <div class="phone">핸드폰번호 : {{ user.phone }}</div>
          <div class="address">주소 : {{ user.address }}</div>
          <div class="content">
            메모 : {{ user.content ? user.content : "메모가 없습니다" }}
          </div>
        </div>
      </div>
      <div class="body"></div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout.vue";
import PlainButton from "@/components/PlainButton.vue";
export default {
  components: {
    MainLayout,
    PlainButton
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
        history: [],
        id: 38,
        lastDate: "2020-03-11T10:13:23.430Z"
      },
      loading: false
    };
  },
  async created() {
    this.loading = true;
    // const res = await this.$api.user.getCurrentUser(this.$route.params.id);
    // this.user = res.data;
    this.loading = false;
  },
  computed: {
    formRegistreDate() {
      return this.moment(this.user.registreDate).format("YYYY년 M월 D일");
    }
  },
  methods: {
    goToUserEdit() {
      const id = this.$route.params.id;
      const data = {
        name: this.user.name,
        content: this.user.content,
        address: this.user.address,
        registreDate: this.user.registreDate,
        phone: this.user.phone
      };
      this.$router.push({ path: `/users/edit/${id}`, query: { data: data } });
    }
  }
};
</script>

<style lang="scss" scoped>
section {
}
.header {
  padding: 0 160px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
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
    margin-top: 40px;
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
</style>
