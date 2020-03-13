<template>
  <MainLayout :padded="false">
    <section class="create-user">
      <div class="header">
        <h3>고객 추가</h3>
        <el-tooltip
          class="item"
          effect="light"
          content="고객 추가를 위해 필수항목을 적고 등록 버튼을 누르세요"
          placement="top"
        >
          <i
            class="el-icon-question"
            :style="{ color: '#64AEFF', fontSize: '18px' }"
          ></i>
        </el-tooltip>
      </div>

      <div class="name">
        <div class="label-group">
          <label>01 </label>
          <label> 회사명</label>
        </div>
        <div class="input-group">
          <el-input
            v-model="data.name"
            placeholder="회사명을 입력해주세요"
          ></el-input>
        </div>
      </div>

      <div class="mobile">
        <div class="label-group">
          <label>02 </label>
          <label>휴대폰번호: </label>
        </div>
        <div class="input-group">
          <el-input
            placeholder="휴대폰 번호를 입력해주세요"
            v-model="data.phone"
            :value="formatContact(data.phone)"
            @keypress.native="validateKey"
          ></el-input>
        </div>
      </div>

      <div class="address">
        <div class="label-group">
          <label>03 </label>
          <label> 주소 : </label>
        </div>
        <div class="input-group">
          <el-input
            v-model="data.address"
            placeholder="주소를 입력해주세요"
          ></el-input>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>04 </label>
          <label>등록일 : </label>
        </div>
        <div class="input-group">
          <el-date-picker
            v-model="data.registreDate"
            type="date"
            placeholder="등록일을 입력해주세요"
            format="yyyy년 M월 d일"
            value-format="yyyy-MM-dd"
            :clearable="false"
          ></el-date-picker>
        </div>
      </div>

      <div class="content">
        <div class="label-group">
          <label>05 </label>
          <label> 비고 : </label>
        </div>
        <div class="input-group">
          <el-input
            v-model="data.content"
            placeholder="참고사항입력해수세요, 낫필수"
          ></el-input>
        </div>
      </div>
      <ul>
        <li v-for="el in memberData" :key="el.name">
          {{ el }}
        </li>
      </ul>

      <BottomActionBar>
        <!-- <el-button
          v-if="!!member && canDeleteMembers"
          :disabled="isSaving"
          type="danger"
          @click="deleteMember"
          >회원 삭제</el-button
        > -->
        <el-button v-if="!edit" v-loading="isSaving" @click="registredUser"
          >등록</el-button
        >
        <el-button v-if="edit" v-loading="isSaving" @click="deleteUser"
          >삭제</el-button
        >
        <el-button v-if="edit" v-loading="isSaving" @click="updateUser"
          >수정</el-button
        >
      </BottomActionBar>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
import BottomActionBar from "@/components/BottomActionBar";
export default {
  components: {
    MainLayout,
    BottomActionBar
  },
  data() {
    return {
      data: {
        name: null,
        registreDate: null,
        phone: null,
        address: null,
        content: null,
        salesData: []
      },
      memberData: null,
      isSaving: false,
      edit: false
    };
  },

  created() {
    if (this.$route.params) {
      this.edit = true;
      this.data = { ...this.$route.query.data };
    }
  },

  methods: {
    formatContact(number) {
      if (!number) return;
      if (number.length > 10) {
        this.data.phone = number.replace(
          /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
          "$1-$2-$3"
        );
      }
    },
    validateKey(e) {
      const isNumber = !!e.key.replace(/\D/g, "");
      const isMaxLength = e.srcElement.value.replace(/-/g, "").length >= 11;
      if (!isNumber || isMaxLength) e.preventDefault();
    },

    valid() {
      const title = "회원 추가 실패";
      let message = "회원 추가 실패하였습니다. 다시 시도해주세요";
      if (!this.data.name) {
        message = "회사명을 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.registreDate) {
        message = "등록일을 선택해주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.phone) {
        message = "휴대폰 번호를 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.address) {
        message = "주소를 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      }

      return true;
    },

    async registredUser() {
      if (!this.valid()) return;
      this.isSaving = true;
      const sendData = {
        name: this.data.name,
        content: this.data.content,
        password: this.data.phone,
        phone: this.data.phone,
        address: this.data.address,
        registreDate: this.data.registreDate
      };
      const res = await this.$api.user.createUser(sendData);
      let title = "회원 추가 성공";
      let message = "회원 추가 성공하였습니다.";

      if (res.status === 200) {
        this.isSaving = false;
        this.$alert(message, title, { showClose: false }).then(() =>
          this.$router.push("/users")
        );
      } else {
        title = "회원 추가 실패";
        message = "회원 추가 실패하였습니다. 다시 시도해주세요";
        this.isSaving = false;
        this.$alert(message, title, { showClose: false }).then(() =>
          this.$router.push("/users")
        );
      }
    },

    async updateUser() {
      if (!this.valid()) return;
      this.isSaving = true;
      const sendData = {
        name: this.data.name,
        content: this.data.content,
        password: this.data.phone,
        phone: this.data.phone,
        address: this.data.address,
        registreDate: this.data.registreDate
      };
      const res = await this.$api.user.updateUser(
        sendData,
        this.$route.params.id
      );
      let title = "회원 수정 성공";
      let message = "회원 수정 성공하였습니다.";
      if (res.status === 200) {
        this.isSaving = false;
        this.$alert(message, title, { showClose: false }).then(() =>
          this.$router.push("/users")
        );
      } else {
        title = "회원 수정 실패";
        message = "관리자에게 문의해주세요";
        this.isSaving = false;
        this.$alert(message, title, { showClose: false });
      }
    },

    async deleteUser() {
      this.isSaving = true;
      const res = await this.$api.user.deleteUser(this.$route.params.id);
      let title = "회원 삭제 성공";
      let message = "회원 삭제 성공하였습니다.";
      if (res.status === 200) {
        this.isSaving = false;
        this.$alert(message, title, { showClose: false }).then(() =>
          this.$router.push("/users")
        );
      } else {
        title = "회원 삭제 실패";
        message = "관리자에게 문의해주세요";
        this.isSaving = false;
        this.$alert(message, title, { showClose: false });
      }
    }
  }
};
</script>

<style lang="scss" scope>
.header {
  display: flex;
  i {
    margin: 22px 0 0 10px;
  }
}
.create-user {
  padding: 10px 160px;
  overflow-y: auto;
  height: 85vh;
  h3 {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: normal;
    margin: 14px 0;
  }
  .name,
  .mobile,
  .address,
  .registered-at,
  .content {
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

  /deep/ .el-input {
    width: 70%;
  }
  /deep/ .el-button {
    height: 30px;
    line-height: 6px;
    width: 70px;
    margin-right: 20px;
  }
}
</style>
