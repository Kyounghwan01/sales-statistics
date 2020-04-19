<template>
  <div class="container">
    <el-table
      :data="users"
      empty-text="회사가 없습니다."
      row-class-name="members-list__row"
      @cell-click="handleCellClick"
      fit
    >
      <el-table-column fixed="left" label="이름" min-width="80" align="center">
        <template v-slot="scope">
          <div class="members-list__name">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="전화번호"
        min-width="140"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <div class="members-list__phone">
            {{ formatMobile(scope.row.phone) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="등록일"
        min-width="140"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <div class="members-list__registered-at">
            {{ scope.row.registreDate }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="주소"
        min-width="140"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <div class="members-list__address">
            {{ scope.row.address }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="최근 변경일"
        min-width="140"
        header-align="center"
        align="center"
      >
        <template v-slot="scope">
          <div class="members-list__address">
            {{ scope.row.lastDate.slice(0, -14) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
    companyUid: String
  },

  methods: {
    formatMobile(phone) {
      return this.$filters.mobile(phone);
    },

    handleCellClick(row) {
      this.$router.push(`/users/${row.id}?uid=${this.companyUid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  overflow-y: auto;
  text-align: center;
}

.el-table {
  ::v-deep .members-list__row {
    cursor: pointer;
  }
}
</style>
