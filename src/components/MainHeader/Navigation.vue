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
    <span class="logout" @click="logout">로그아웃</span>
  </el-menu>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

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
  },
  methods: {
    logout() {
      this.$confirm("로그아웃 하시겠습니까?", "로그아웃", {
        showClose: true
      })
        .then(async () => {
          try {
            await firebase.auth().signOut();
          } catch (error) {
            this.$alert("로그아웃 에러", "로그아웃 실패");
          } finally {
            this.$router.push("/");
          }
        })
        .catch(() => false);
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
.logout {
  font-size: 14px;
  color: #909399;
  position: absolute;
  top: 22px;
  right: 10px;
}
.logout:hover {
  cursor: pointer;
  color: dodgerblue;
}
</style>
