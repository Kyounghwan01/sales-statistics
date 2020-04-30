<template>
  <el-tabs :value="activeName" @tab-click="changeTabs(activeName === 'history' ? 'writeTrade' : 'history')">
    <el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value"></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: {
    tabs: Array,
    activeName: String,
    changeTabs: Function,
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__item {
  color: grey;
}
</style>
