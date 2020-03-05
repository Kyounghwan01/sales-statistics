<template>
  <el-menu
    class="main-nav"
    mode="horizontal"
    :default-active="activeLink"
    router
  >
    <el-menu-item
      class="main-nav__item"
      v-for="link in navLinks"
      :key="link.path"
      :index="link.path"
    >
      {{ link.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    activeLink() {
      return `/${this.$route.path.split("/")[1]}`;
    },

    navLinks() {
      const links = [
        { path: "/list", name: "현황" },
        { path: "/donate", name: "기입" },
        { path: "/users", name: "회원" },
        { path: "/sales", name: "현황분석" }
      ];

      return links;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-nav {
  flex: 1;
  display: flex;
  border: none;
  overflow-x: auto;
  overflow-y: hidden;

  &__item {
    position: relative;

    span {
      font-family: ArialNarrow;
      font-size: 10px;
      font-style: italic;
      color: blue;
      position: absolute;
      top: -6px;
      right: 2px;
    }
  }
}
</style>
