<template>
  <MainLayout :padded="false">
    <section class="create-user" v-loading="!userList">
      <div class="header">
        <h3>매출/매입 추가</h3>
        <el-tooltip class="item" effect="light" placement="top">
          <p v-if="edit" slot="content">
            고객 추가를 위해 필수항목을 적고 수정 버튼을 누르세요<br />
            고객 삭제시 삭제 버튼을 누르세요
          </p>
          <p v-else slot="content">
            매출/매입 추가를 위해 필수항목을 적고 등록 버튼을 누르세요
          </p>
          <i
            class="el-icon-question"
            :style="{ color: '#64AEFF', fontSize: '18px' }"
          ></i>
        </el-tooltip>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>01 </label>
          <label>매입 / 매출 </label>
        </div>
        <div class="input-group radio-group">
          <el-radio v-model="data.type" :label="true">매입</el-radio>
          <el-radio v-model="data.type" :label="false">매출</el-radio>
        </div>
      </div>

      <div class="name">
        <div class="label-group">
          <label>02 </label>
          <label> 회사 선택</label>
        </div>
        <div class="input-group select-user">
          <el-input
            v-model="keyword"
            :disabled="search"
            placeholder="이름 또는 전화번호 입력하세요"
          ></el-input>
        </div>
        <ul>
          <li
            :class="['user-list', search ? 'selected' : null]"
            v-for="list in userList"
            :key="list.id"
            @click="choiceUser(list.id, list.name)"
          >
            {{ list.name }} · {{ list.phone }}
            <span class="selected-span" v-if="search">선택</span>
          </li>
        </ul>
        <!-- {{ userList }} -->
        <!-- <div class="invalid-feedback">
          <span class="required" v-if="!$v.data.name.required"
            >회사명은 필수값 입니다</span
          >
        </div> -->
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>03 </label>
          <label>거래일 </label>
        </div>
        <div class="input-group">
          <el-date-picker
            v-model="data.date"
            type="date"
            placeholder="거래일을 입력해주세요"
            format="yyyy년 M월 d일"
            value-format="yyyy-MM-dd"
            :clearable="false"
          ></el-date-picker>
        </div>
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
        <!-- <div class="invalid-feedback">
          <span class="required" v-if="!$v.data.name.required"
            >회사명은 필수값 입니다</span
          >
        </div> -->
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
        <!-- <div class="invalid-feedback">
          <span class="required" v-if="!$v.data.name.required"
            >회사명은 필수값 입니다</span
          >
        </div> -->
      </div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from "@/router/layouts/MainLayout";

const DEFAULT_DATA = {
  type: true,
  date: null,
  price: null,
  memo: null,
  goods: null,
  unitPrice: null,
  count: null,
  outstanding: 0,
  userId: null
};

export default {
  components: {
    MainLayout
  },
  data() {
    return {
      data: { ...DEFAULT_DATA },
      edit: false,
      keyword: null,
      loading: false,
      search: false
    };
  },

  created() {
    this.$store.dispatch("users/getUser");
  },

  computed: {
    userList() {
      console.log(this.$store.getters["users/user"]);
      return this.$store.getters["users/user"];
    }
  },

  watch: {
    keyword: function() {
      this.$store.dispatch("users/filterUser", this.keyword);
    }
  },

  methods: {
    choiceUser(id, name) {
      this.search = !this.search;
      console.log(this.search);
      console.log(id, name);
      this.keyword = name;
    }
  }
};
</script>

<style lang="scss" scoped>
.select-user {
  /deep/ .el-input__inner {
    border-radius: 80px;
    width: 200px;
  }
}

.user-list {
  padding: 10px;
  list-style: none;
  border-bottom: 1px solid #eee;
  width: 250px;
}
.user-list:hover {
  background-color: rgba(#eee, 0.4);
  cursor: pointer;
}
.selected {
  background-color: rgba(#4799f2, 0.1);
  .selected-span {
    border: 1px solid dodgerblue;
    color: dodgerblue;
    font-size: 12px;
    margin-left: 15px;
    padding: 2px 8px;
    border-radius: 8px;
  }
}
/* .create-user {
  padding: 10px 160px;xx
  overflow-y: auto;
  height: 85vh;
  .header {
    display: flex;
    p {
      width: 10px;
    }
    i {
      margin: 22px 0 0 10px;
    }
  }
} */
</style>
