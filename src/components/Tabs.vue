<template>
  <el-tabs v-model="currentTab" @tab-click="changeTabs(currentTab)">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :name="tab.value"
    ></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: {
    tabs: Array,
    activeName: String,
    changeTabs: Function
  },
  data() {
    return {
      currentTab: null
    };
  },
  created() {
    if (this.activeName) {
      this.currentTab = this.activeName.slice();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__item {
  color: grey;
}
</style>
