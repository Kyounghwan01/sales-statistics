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
        v-model="data.registreDate"
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

    <div class="content">
      <label> 비고 : </label>
      <el-input
        v-model="data.content"
        placeholder="참고사항입력해수세요, 낫필수"
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
import axios from "axios";
export default {
  components: {
    MainLayout
  },
  data() {
    return {
      data: {
        name: null,
        registreDate: null,
        phone: null,
        address: null,
        content: null,
        salesData: [],
      },
      memberData: null
    };
  },
  async created() {
    // const res = await axios.get(
    //   "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/board"
    // );
    // this.memberData = res.data;
    // console.log(this.memberData);
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
    async registredUser() {
      const sendData = {
        name: this.data.name,
        content: this.data.content,
        password: this.data.phone,
        phone: this.data.phone,
        address: this.data.address,
        registreDate: this.data.registreDate
      };
      const res = await axios.post(
        "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/board",
        sendData
      );
      console.log(res);
    }
  }
};
//https://github.com/academind/yt-devmeetup-vue-firebase/blob/master/src/store/index.js
</script>

<style></style>
