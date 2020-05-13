<template>
  <MainLayout :padded="false">
    <div class="outter">
      <section class="login-user" v-loading="loading">
        <div class="header">
          <h3>매출 관리 툴 로그인</h3>
        </div>
        <div class="id">
          <div class="label-group">
            <label>01 </label>
            <label>이메일</label>
          </div>
          <div>
            <el-input
              :class="
                ($v.data.loginId.$dirty && !$v.data.loginId.required) ||
                ($v.data.loginId.$dirty && !$v.data.loginId.email)
                  ? 'error'
                  : null
              "
              v-model.trim="$v.data.loginId.$model"
              placeholder="example@naver.com"
            />
            <div class="invalid-feedback">
              <span class="required" v-if="!$v.data.loginId.required">이메일은 필수값 입니다</span>
              <span class="required" v-if="!$v.data.loginId.email">이메일 형식을 맞춰주세요</span>
            </div>
          </div>
        </div>

        <div class="password">
          <div class="label-group">
            <label>02 </label>
            <label>패스워드</label>
          </div>
          <el-input
            :class="
              ($v.data.loginPassword.$dirty && !$v.data.loginPassword.required) ||
              ($v.data.loginPassword.$dirty && !$v.data.loginPassword.maxLength) ||
              ($v.data.loginPassword.$dirty && !$v.data.loginPassword.minLength)
                ? 'error'
                : null
            "
            v-model="$v.data.loginPassword.$model"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          ></el-input>
          <div class="invalid-feedback">
            <span class="required" v-if="!$v.data.loginPassword.required">비밀번호는 필수값 입니다</span>
            <span class="required" v-if="!$v.data.loginPassword.minLength">비밀번호를 6자리 이상으로 맞춰주세요</span>
            <span class="required" v-if="!$v.data.loginPassword.maxLength">비밀번호를 10자리 이하로 맞춰주세요</span>
          </div>
        </div>

        <div class="login-button">
          <el-button @click="login">로그인</el-button>
        </div>
        <div class="register padding-top">
          <el-button @click="$router.push('/sign-up')">회원가입</el-button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import MainLayout from '@/router/layouts/MainLayout.vue';
import { Component, Vue } from 'vue-property-decorator';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  components: {
    MainLayout,
  },
  mixins: [validationMixin],
  validations: {
    data: {
      loginId: { required, email },
      loginPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10),
      },
    },
  },
})
export default class Home extends Vue {
  public data = {
    loginId: '',
    loginPassword: '',
  };
  public loading = false;

  created(): void {
    this.check();
  }

  check(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('users').catch(error => {
          if (error.name != 'NavigationDuplicated') {
            throw error;
          }
        });
      }
    });
  }

  async login(): Promise<void> {
    ['loginId', 'loginPassword'].forEach(key => {
      if (!this.$v || !this.$v.data) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataCheck = this.$v.data[key] as any;
      if (!dataCheck.required || !dataCheck.email) {
        dataCheck.$touch();
      }
    });

    this.loading = true;
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(this.data.loginId, this.data.loginPassword);
      if (res) {
        this.loading = false;
        const response = await this.$api.loginUser.getLoginUser(res.user);
        await this.$store.dispatch('loginUser/setUser', response.data);
        this.$router.push('users').catch(error => {
          if (error.name != 'NavigationDuplicated') {
            throw error;
          }
        });
      }
    } catch (error) {
      let message = '';

      switch (error.code) {
        case 'auth/user-not-found':
          message = '없는 이메일 입니다';
          break;
        case 'auth/wrong-password':
          message = '비밀번호가 틀렸습니다';
          break;
        default:
          message = '로그인 실패';
      }

      this.$message.error({ showClose: true, message });
      this.loading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.outter {
  width: 100%;
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-user {
  height: 480px;
  width: 500px;
  border-radius: 10px;
}
.header {
  padding: 40px 0 25px 0;
  display: flex;
  justify-content: center;
  h3 {
    font-size: 25px;
    margin: 0;
  }
}

.login-button,
.register {
  padding: 20px;
  ::v-deep .el-button {
    width: 460px;
    height: 50px;
    color: white;
    font-weight: bold;
    font-size: 15px;
    background-color: rgba(dodgerblue, 0.8);
  }
  ::v-deep .el-button:hover {
    background-color: rgba(dodgerblue, 1);
  }
}
.padding-top {
  padding-top: 0px;
}

.id,
.password {
  .label-group {
    margin-bottom: 20px;
    label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  padding: 20px;
  ::v-deep .el-input {
    width: 460px;
  }
}
.error {
  border: 1px solid red;
  border-radius: 4px;
  ::v-deep .el-input__inner {
    border: none;
  }
}
.invalid-feedback {
  height: 15px;
  .required {
    color: red;
    margin-left: 5px;
    font-size: 13px;
  }
}
</style>
