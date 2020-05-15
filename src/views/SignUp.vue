<template>
  <MainLayout :padded="false">
    <div class="outter">
      <section class="login-user">
        <div class="header">
          <h3>회원가입</h3>
        </div>
        <div class="id">
          <div class="label-group">
            <label>01 </label>
            <label>이메일</label>
          </div>
          <div class="input-group">
            <el-input
              :class="
                ($v.data.registredId.$dirty && !$v.data.registredId.required) ||
                ($v.data.registredId.$dirty && !$v.data.registredId.email)
                  ? 'error'
                  : null
              "
              v-model.trim="$v.data.registredId.$model"
              placeholder="example@naver.com"
            ></el-input>
            <div class="invalid-feedback">
              <span class="required" v-if="!$v.data.registredId.required">이메일은 필수값 입니다</span>
              <span class="required" v-if="!$v.data.registredId.email">이메일 형식을 맞춰주세요</span>
            </div>
          </div>
        </div>

        <div class="password">
          <div class="label-group">
            <label>02 </label>
            <label>패스워드</label>
          </div>
          <div class="input-group">
            <el-input
              :class="
                ($v.data.registredPassword.$dirty && !$v.data.registredPassword.required) ||
                ($v.data.registredPassword.$dirty && !$v.data.registredPassword.maxLength) ||
                ($v.data.registredPassword.$dirty && !$v.data.registredPassword.minLength)
                  ? 'error'
                  : null
              "
              v-model="$v.data.registredPassword.$model"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></el-input>
            <div class="invalid-feedback">
              <span class="required" v-if="!$v.data.registredPassword.required">비밀번호는 필수값 입니다</span>
              <span class="required" v-if="!$v.data.registredPassword.minLength"
                >비밀번호를 6자리 이상으로 맞춰주세요</span
              >
              <span class="required" v-if="!$v.data.registredPassword.maxLength"
                >비밀번호를 10자리 이하로 맞춰주세요</span
              >
            </div>
          </div>
        </div>

        <div class="id">
          <div class="label-group">
            <label>03 </label>
            <label>사용자 이름</label>
          </div>
          <div class="input-group">
            <el-input
              :class="$v.data.registredName.$dirty && !$v.data.registredName.required ? 'error' : null"
              v-model.trim="$v.data.registredName.$model"
              placeholder="company"
            ></el-input>
            <div class="invalid-feedback">
              <span class="required" v-if="!$v.data.registredName.required">사용자 이름은 필수값 입니다</span>
            </div>
          </div>
        </div>

        <div class="login-button">
          <el-button @click="signUp" v-loading="loading">회원가입</el-button>
        </div>
        <div class="register padding-top">
          <el-button @click="$router.push('/')">로그인</el-button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from '@/router/layouts/MainLayout.vue';
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
      registredId: { required, email },
      registredPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10),
      },
      registredName: { required },
    },
  },
})
export default class SignUp extends Vue {
  public data: { registredId: string | null; registredPassword: string | null; registredName: string | null } = {
    registredId: null,
    registredPassword: null,
    registredName: null,
  };

  public loading = false;

  async signUp(): Promise<void> {
    let isError = false;

    ['registredId', 'registredPassword', 'registredName'].forEach(key => {
      if (!this.$v || !this.$v.data) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataCheck = this.$v.data[key] as any;

      if (key === 'registredId' && !dataCheck.email) {
        isError = true;
        dataCheck.$touch();
      }
      if (!dataCheck.required) {
        isError = true;
        dataCheck.$touch();
      }
      if (!dataCheck.maxLength || !dataCheck.minLength) {
        dataCheck.$touch();
      }
    });

    if (isError) return;
    try {
      this.loading = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.registredId || '', this.data.registredPassword || '');
      if (user) {
        const res = await this.$api.loginUser.createLoginUser({
          id: user.user.uid,
          name: this.data.registredName,
          email: this.data.registredId,
        });
        if (res.status === 200) {
          const { name, email } = res.data;
          const resStore = await this.$store.dispatch('loginUser/setUser', {
            id: user.user.uid,
            name: name,
            email: email,
          });
          if (resStore === 'success') {
            this.$alert('회원가입 성공하였습니다.', '회원가입 성공', {
              showClose: true,
              dangerouslyUseHTMLString: true,
            }).then(() => this.$router.push('/'));
          }
        }
      }
    } catch (err) {
      this.$alert(err.message, '회원가입 실패', {
        showClose: true,
        dangerouslyUseHTMLString: true,
      });
    } finally {
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
.registred-id,
.registred-password,
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
