<template>
  <Fragment>
    <el-menu class="main-nav" mode="horizontal" :default-active="activeLink" router>
      <el-menu-item
        class="main-nav__item"
        v-for="link in navLinks"
        :disabled="link.disabled"
        :key="link.path"
        :index="link.path"
      >
        {{ link.name }}
      </el-menu-item>
      <el-dropdown
        class="logout"
        trigger="click"
        placement="top-end"
        v-if="loginUser.name"
        @command="command => command()"
        v-loading="loading"
      >
        <span class="user-menu__user">
          <span>
            <b>{{ loginUser.name }}님</b>
            <i class="el-icon-arrow-down"></i>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in menuItems"
            :key="item.label"
            :command="item.onClick"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>

    <EditLoginUser :show="isShowEditModal" @close="editUserData" :prevData="editData" />
  </Fragment>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Fragment } from 'vue-fragment';
import * as _ from 'lodash';
import EditLoginUser from '@/components/Members/EditLoginUser.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Fragment,
    EditLoginUser,
  },
})
export default class Navigation extends Vue {
  public isShowEditModal = false;
  public loading = false;

  get menuItems() {
    return [
      {
        label: '유저수정',
        divided: true,
        onClick: this.showEditModal,
        disabled: false,
      },
      {
        label: '유저삭제',
        divided: true,
        onClick: this.deleteUser,
        disabled: false,
      },
      {
        label: '로그아웃',
        onClick: this.logout,
        disabled: false,
      },
    ];
  }

  get activeLink() {
    return `/${this.$route.path.split('/')[1]}`;
  }
  get loginUser() {
    return this.$store.getters['loginUser/loginUser'];
  }
  get navLinks() {
    const links = [
      { path: '/orders', name: '현황', disabled: false },
      { path: '/fill', name: '기입', disabled: false },
      { path: '/users', name: '회사', disabled: false },
      { path: '/sales', name: '통계', disabled: false },
    ];

    return links;
  }
  get editData() {
    return _.omit(this.loginUser, ['_id', 'id', '__v']);
  }

  logout() {
    this.$confirm('로그아웃 하시겠습니까?', '로그아웃', {
      showClose: true,
    })
      .then(async () => {
        try {
          await firebase.auth().signOut();
          await this.$store.dispatch('loginUser/logOutUser');
        } catch (error) {
          this.$alert('로그아웃 에러', '로그아웃 실패');
        } finally {
          this.$router.push('/');
        }
      })
      .catch(() => false);
  }

  showEditModal() {
    this.isShowEditModal = true;
  }

  async editUserData(
    result: boolean,
    value: {
      email: string;
      name: string;
    },
  ) {
    this.isShowEditModal = result;
    if (value) {
      this.loading = true;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const test = firebase.auth();
      test.currentUser
        ? test.currentUser
            .updateEmail(value.email)
            .then(async function() {
              const res = await that.$api.loginUser.editLoginUser(that.loginUser.id, value);
              if (res.data === 'success') {
                that.$store.commit('loginUser/SET_LOGIN_USER', {
                  ...that.loginUser,
                  name: value.name,
                  email: value.email,
                });
              }
            })
            .catch(() => that.$alert('로그아웃 이후 다시 실행 해주세요', '계정 수정 실패'))
        : Promise.resolve();
      this.loading = false;
    }
  }

  async deleteUser() {
    // TODO: 계정 삭제시 관련된 order, company데이터 삭제
    this.$confirm(`주의! ${this.loginUser.name} 계정을 삭제 하시겠습니까?`, '계정 삭제', {
      showClose: true,
    })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        const test = firebase.auth();
        test.currentUser
          ? test.currentUser.delete().then(async function() {
              const res = await that.$api.loginUser.deleteLoginUser(that.loginUser.id);
              if (res.data === 'success') {
                that.$store.dispatch('loginUser/logOutUser');
                that.$router.push('/');
                that.$alert('계정 삭제완료', '삭제');
              }
            })
          : Promise.resolve();
      })
      .catch(() => false);
  }
}
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
