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
            {{ scope.row.phone }}
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
    users: Array
    // showAppLink: { type: Boolean, default: true },
    // showLastAttendedOn: { type: Boolean, default: false },
  },

  methods: {
    handleCellClick(row) {
      this.$router.push(`/users/${row.id}`);
    }
    // getUserGrade({ user_grade }) {
    //   if (!user_grade) return null;
    //   const { exceeded, exceededAt } = this.$utils.checkBytesOfString(user_grade.name, 5);
    //   return !exceeded ? user_grade.name : `${user_grade.name.slice(0, exceededAt)}...`;
    // },
    // getMobileNumber({ mobile }) {
    //   if (!mobile) return null;
    //   return this.canViewMembersMobile ? this.$filters.mobile(mobile) : this.$filters.mobileMask(mobile);
    // },
    // handleEmailCopySuccess(email) {
    //   this.$message({
    //     message: `이메일이 복사되었습니다 (${email})`,
    //     type: 'success',
    //     duration: 2000,
    //   });
    // },
    // isExpired(userTicket) {
    //   return this.$utils.getTicketStatus(userTicket) === '이용만료';
    // },
    // getExpiredStatus({ expire_at, remaining_coupon }) {
    //   if (remaining_coupon <= 0) return '횟수만료';
    //   const remainingDays = this.$utils.getDaysDiff(expire_at);
    //   if (remainingDays < 0) return '기간만료';
    //   return null;
    // },
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  overflow-y: auto;
  text-align: center;
}
/* .members-list {
  &__name {
    display: grid;
    grid-template-columns: 36px 1fr;
    grid-gap: 5px;
    align-items: center;

    img {
      border-radius: 50%;
      width: 36px;
      height: 36px;
    }
  }

  &__inactive-member {
    background-color: rgba(245, 108, 108, 0.1);
    border : 1px solid rgba(245, 108, 108, 0.2);
    color: red;
    width: 60px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    border-radius: 5px;
  }

  &__user-grade {
    background: #757575;
    color: #fff;
    font-size: 11px;
    padding: 0 8px;
    border-radius: 4px;
  }

  &__ticket-list {
    li {
      display: flex;
      margin: 6px 6px 6px 0;
    }

    &__title {
      @include ellipsis;
      @include flex(row, center);
      width: 120px;
      text-align: left;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;

      span {
        font-size: 14px;
        margin-right: 4px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  &__app-link {
    background: gray;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition: background 0.15s;

    &.has_email:hover {
      cursor: pointer;
      background: rgba($link-color, 0.1);
    }

    &-header {
      @include flex(row, center);
      margin: 0;
      padding: 0;

      i {
        color: $deep-sky-blue;
        font-size: 18px;
        margin-left: 4px;
      }
    }
  }

  &__user-email {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;

    span {
      text-align: right;
      transition: 0.15s;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-left: 4px;
      transition: background 0.15s, color 0.15s;

      &:hover {
        background: $link-color;
        color: white;
      }

      i:first-child {
        transform: translate(3px, 2px);
      }

      i:last-child {
        transform: translate(-3px, -2px);
      }
    }
  }
}

.el-table {
  ::v-deep .members-list__row {
    cursor: pointer;
  }
} */
</style>
