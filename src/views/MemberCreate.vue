<template>
  <MainLayout>
    <div class="name">
      <label> 회사명 : </label>
      <el-input
        v-model="data.name"
        placeholder="회사명을 입력해주세요"
      ></el-input>
    </div>
    <div class="registered-at">
      <label>등록일 : </label>
      <el-date-picker
        v-model="data.registeredAt"
        type="date"
        placeholder="등록일을 입력해주세요"
        format="yyyy년 M월 d일"
        value-format="yyyy-MM-dd"
        :clearable="false"
      ></el-date-picker>
    </div>
    <div class="mobile">
      <label>휴대폰번호: </label>
      <el-input
        v-model="data.phone"
        :value="formatContact(data.phone)"
        @keypress.native="validateKey"
      ></el-input>
    </div>
    <div class="address">
      <label> 주소 : </label>
      <el-input
        v-model="data.address"
        placeholder="주소를 입력해주세요"
      ></el-input>
    </div>
    <ul>
      <li v-for="el in memberData" :key="el.name">
        {{ el }}
      </li>
    </ul>
    <el-button type="primary" @click="registredUser">등록</el-button>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";
// import { database } from "@/api/modules/firebase";
export default {
  components: {
    MainLayout
  },
  data() {
    return {
      data: {
        name: null,
        registeredAt: null,
        phone: null,
        address: null,
        salesData: []
      },
      memberData: null
    };
  },
  async created() {
    const a = await this.$api.firebase.getMember().once("value");
    this.memberData = await a.val();
    console.log(a);
    // this.memberData = this.$api.firebase.getMember().;
    // console.log(this.memberData);
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
    registredUser() {
      this.$api.firebase.setMember(this.data);
    }
  }
};
//https://github.com/academind/yt-devmeetup-vue-firebase/blob/master/src/store/index.js
</script>

<style></style>
