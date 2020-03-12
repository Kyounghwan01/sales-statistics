<template>
  <MainLayout :padded="false">
    <div class="outter">
      <section class="login-user">
        <!-- <div class="isLogded">
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <el-button class="logout" @click="logout">로그아웃</el-button>
        <el-button class="logout" @click="check">로그인확인</el-button>
      </div> -->

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
              v-model="data.registredId"
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
              v-model="data.registredPassword"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></el-input>
          </div>
        </div>

        <div class="login-button">
          <el-button @click="signUp">회원가입</el-button>
        </div>
         <div class="register padding-top">
          <el-button @click="$router.push('/')">로그인</el-button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script>
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
        registredId: null,
        registredPassword: null
      }
    };
  },
  methods: {
    async signUp() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.data.registredId,
            this.data.registredPassword
          );
        if (user) {
          this.$alert("회원가입 성공하였습니다.", "회원가입 성공", {
            showClose: false,
            dangerouslyUseHTMLString: true
          }).then(() => this.$router.push("/"));
        }
      } catch (err) {
        this.$alert(err.message, "회원가입 실패", {
          showClose: false,
          dangerouslyUseHTMLString: true
        });
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
  /deep/ .el-input {
    width: 460px;
  }
}
</style>
