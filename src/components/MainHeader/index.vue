<template>
  <header id="main-header">
    <slot></slot>

    <div class="main-header__inner">
      <router-link to="/" class="main-header__home">
        <img style="width: 30px" src="../../assets/logo.png" alt="뷰 로고" />
      </router-link>
      <navigation />
    </div>
  </header>
</template>

<script>
import Navigation from './Navigation';
// import UserMenu from './UserMenu';

export default {
  components: {
    Navigation,
    // UserMenu,
  },

  // computed: {
  //   studio() {
  //     return this.$store.getters['studio/studio'];
  //   },
  // },

  // watch: {
  //   $route: {
  //     handler: 'handleRouteChange',
  //     immediate: true,
  //   },
  // },

  // methods: {
  //   async handleRouteChange() {
  //     if (!this.studio || !this.studio.name) {
  //       this.$store.dispatch('studio/getStudio');
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
#main-header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ebebeb;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.main-header__inner {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;

  ::v-deep .el-menu {
    border-bottom: none;
  }
}

.main-header__home {
  margin: 15px 10px 0 10px;
}
</style>
