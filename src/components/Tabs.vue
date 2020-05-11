<template>
  <el-tabs :value="activeName" @tab-click="changeTabs(activeName === 'history' ? 'writeTrade' : 'history')">
    <el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  @Prop() public tabs!: string[];
  @Prop() public activeName!: string;
  @Prop() public changeTabs!: Function;
}
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__item {
  color: grey;
}
</style>
