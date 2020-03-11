<template>
  <MainLayout :padded="false">
    user Detail page
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
export default {
  components: {
    MainLayout
  },
  async created() {
    const a = await this.$api.user.getCurrentUser(this.$route.params.id);
    console.log(a);
  }
};
</script>

<style></style>
