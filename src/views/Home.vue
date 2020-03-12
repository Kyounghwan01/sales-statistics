<template>
  <MainLayout :padded="false">
    <div class="outter">
      <section class="login-user" v-loading="loading">
        <div class="header">
          <h3>로그인</h3>
        </div>
        <div class="id">
          <div class="label-group">
            <label>01 </label>
            <label>이메일</label>
          </div>
          <div class="input-group">
            <el-input
              v-model="data.loginId"
              placeholder="example@naver.com"
            ></el-input>
          </div>
        </div>

        <div class="password">
          <div class="label-group">
            <label>02 </label>
            <label>패스워드</label>
          </div>
          <div class="input-group">
            <el-input
              v-model="data.loginPassword"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></el-input>
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

<script>
// @ is an alias to /src
import MainLayout from "@/router/layouts/MainLayout";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {
    MainLayout
  },
  data() {
    return {
      data: {
        loginId: null,
        loginPassword: null,
        registredId: null,
        registredPassword: null
      },
      loading: false
    };
  },
  created() {
    this.check();
  },

  methods: {
    check() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.$router.push("/users");
        }
      });
    },
    async login() {
      this.loading = true;
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.data.loginId,
            this.data.loginPassword
          );
        if (res) {
          this.loading = false;
          this.$router.push("/users");
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
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
  /deep/ .el-button {
    width: 460px;
    height: 50px;
    color: white;
    font-weight: bold;
    font-size: 15px;
    background-color: rgba(dodgerblue, 0.8);
  }
  /deep/ .el-button:hover {
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
  /deep/ .el-input {
    width: 460px;
  }
}
</style>
