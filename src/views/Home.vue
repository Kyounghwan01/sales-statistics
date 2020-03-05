<template>
  <MainLayout>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </MainLayout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MainLayout from "@/router/layouts/MainLayout";

export default {
  components: {
    HelloWorld,
    MainLayout
  }
};
</script>
