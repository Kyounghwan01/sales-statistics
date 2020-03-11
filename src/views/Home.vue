<template>
  <MainLayout :padded="false">
    <section class="login-user">
      <div class="isLogded">
        <span v-if="loggedIn">Yes</span>
        <span v-else>No</span>
        <el-button class="logout" @click="logout">로그아웃</el-button>
        <el-button class="logout" @click="check">로그인확인</el-button>
      </div>

      <div class="header">
        <h3>로그인</h3>
      </div>
      <div class="id">
        <div class="label-group">
          <label>01 </label>
          <label>아이디</label>
        </div>
        <div class="input-group">
          <el-input
            v-model="data.loginId"
            placeholder="아이디를 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요"
          ></el-input>
        </div>
      </div>

      <div class="registred">
        <div class="header">
          <h3>회원가입</h3>
        </div>

        <div class="registred-id">
          <div class="label-group">
            <label>01 </label>
            <label>아이디</label>
          </div>
          <div class="input-group">
            <el-input
              v-model="data.registredId"
              placeholder="아이디를 입력해주세요"
            ></el-input>
          </div>
        </div>

        <div class="registred-password">
          <div class="label-group">
            <label>02 </label>
            <label>패스워드</label>
          </div>
          <div class="input-group">
            <el-input
              v-model="data.registredPassword"
              placeholder="비밀번호를 입력해주세요"
            ></el-input>
          </div>
        </div>
      </div>

      <BottomActionBar>
        <el-button @click="login">로그인</el-button>
        <el-button @click="registredData">등록</el-button>
      </BottomActionBar>
    </section>
  </MainLayout>
</template>

<script>
// @ is an alias to /src
import MainLayout from "@/router/layouts/MainLayout";
import BottomActionBar from "@/components/BottomActionBar";
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {
    MainLayout,
    BottomActionBar
  },
  data() {
    return {
      data: {
        loginId: null,
        loginPassword: null,
        registredId: null,
        registredPassword: null
      },
      loggedIn: false
    };
  },
  created() {
    this.check();
  },

  methods: {
    check() {
      firebase.auth().onAuthStateChanged(user => {
        this.loggedIn = !!user;
        // if (user) {
        //   this.loggedIn = true;
        // } else {
        //   this.loggedIn = false;
        // }
      });
    },
    async login() {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.data.loginId,
            this.data.loginPassword
          );
        console.log("login", res);
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async registredData() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.data.registredId,
            this.data.registredPassword
          );
        console.log(user);
      } catch (err) {
        console.log(err);
      }
      console.log(this.data.registredId, this.data.registredPassword);
    }
  }
};
</script>
<style lang="scss" scoped>
.login-user {
  height: 100vh;
}
.header {
  padding: 35px 0 20px 35px;
  h3 {
    margin: 0;
  }
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
  .input-group {
    margin-left: 30px;
  }
  border-bottom: 1px solid #eee;
  padding: 35px;
}
</style>
