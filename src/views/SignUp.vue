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
              <span class="required" v-if="!$v.data.registredId.required"
                >이메일은 필수값 입니다</span
              >
              <span class="required" v-if="!$v.data.registredId.email"
                >이메일 형식을 맞춰주세요</span
              >
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
                ($v.data.registredPassword.$dirty &&
                  !$v.data.registredPassword.required) ||
                ($v.data.registredPassword.$dirty &&
                  !$v.data.registredPassword.maxLength) ||
                ($v.data.registredPassword.$dirty &&
                  !$v.data.registredPassword.minLength)
                  ? 'error'
                  : null
              "
              v-model="$v.data.registredPassword.$model"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></el-input>
            <div class="invalid-feedback">
              <span class="required" v-if="!$v.data.registredPassword.required"
                >비밀번호는 필수값 입니다</span
              >
              <span class="required" v-if="!$v.data.registredPassword.minLength"
                >비밀번호를 6자리 이상으로 맞춰주세요</span
              >
              <span class="required" v-if="!$v.data.registredPassword.maxLength"
                >비밀번호를 10자리 이하로 맞춰주세요</span
              >
            </div>
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
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
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
  mixins: [validationMixin],
  validations: {
    data: {
      registredId: { required, email },
      registredPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      }
    }
  },
  methods: {
    async signUp() {
      let isError = false;
      ["registredId", "registredPassword"].forEach(key => {
        if (!this.$v.data[key].required || !this.$v.data[key].email) {
          isError = true;
          this.$v.data[key].$touch();
        }
        if (!this.$v.data[key].maxLength || !this.$v.data[key].minLength) {
          this.$v.data[key].$touch();
        }
      });

      if (isError) return;
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
