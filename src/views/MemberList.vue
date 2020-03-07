<template>
  <MainLayout :padded="false">
    <section class="user-list">
      <div class="user-list__header">
        <h3>고객 관리</h3>
      </div>
      <MembersList :members="userData" />
      <div class="div">
        {{ memberList }}
      </div>
      <AddMemberButton @click="$router.push('/users/create')" />
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import MembersList from "@/components/Members/List";
import AddMemberButton from "@/components/AddMemberButton";

export default {
  components: {
    MainLayout,
    MembersList,
    AddMemberButton
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
      ]
    };
  },
  async created() {
    await this.$store.dispatch("members/getMember");
  },
  computed: {
    memberList() {
      return this.$store.getters["members/member"];
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  padding: 10px 80px;
  height: 100vh;
  overflow-y: auto;
  &__header {
    h3 {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: normal;
      margin: 15px;
    }
  }
}
</style>
