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
      :disabled="link.disabled"
      :key="link.path"
      :index="link.path"
    >
      {{ link.name }}
    </el-menu-item>
    {{ loginUser }}
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
    loginUser() {
      return this.$store.getters["loginUser/loginUser"];
    },

    navLinks() {
      const links = [
        { path: "/orders", name: "현황", disabled: false },
        { path: "/fill", name: "기입", disabled: false },
        { path: "/users", name: "회사", disabled: false },
        { path: "/sales", name: "현황분석", disabled: true }
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
