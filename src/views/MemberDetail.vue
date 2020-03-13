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
  created() {
    this.$api.user.getCurrentUser(this.$route.params.id);
  }
};
</script>

<style></style>
