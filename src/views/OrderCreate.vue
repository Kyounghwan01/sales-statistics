<template>
  <MainLayout :padded="false">
    <section class="create-user" v-loading="!userList && loading">
      <div class="header">
        <h3>매출/매입 추가</h3>
        <el-tooltip class="item" effect="light" placement="top">
          <p v-if="edit" slot="content">
            고객 추가를 위해 필수항목을 적고 수정 버튼을 누르세요<br />
            고객 삭제시 삭제 버튼을 누르세요
          </p>
          <p v-else slot="content">
            매출/매입 추가를 위해 필수항목을 적고 기입 버튼을 누르세요
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
          <label>회사 선택</label>
        </div>
        <div class="input-group select-user" @click="showMemberList">
          <el-input
            v-model="keyword"
            :disabled="search"
            placeholder="이름 또는 전화번호 입력하세요"
          ></el-input>
          <div class="invalid-feedback">
            <span class="required" v-if="!$v.data.userId.required"
              >회사명은 필수값 입니다</span
            >
          </div>
        </div>
        <ul v-if="showMeber">
          <li
            :class="[
              'user-list',
              search && keyword === list.name ? 'selected' : null
            ]"
            v-for="list in userList"
            :key="list.id"
            @click="choiceUser(list.id, list.name)"
          >
            {{ list.name }} · {{ formatMobile(list.phone) }}
            <span class="selected-span" v-if="search && keyword === list.name"
              >선택</span
            >
          </li>
        </ul>
        <div class="no-have" v-if="showMeber && !userList.length">
          <span>회사가 없습니다. 먼저 회사를 등록해주세요</span>
        </div>
      </div>

      <TextInput
        label="거래일"
        labelNumber="03"
        v-model="$v.data.date.$model"
        :require="$v.data.date.required"
        placeholder="거래일을 입력해주세요"
        requireMessage="거래일을 필수값 입니다"
        type="date"
      />

      <TextInput
        label="상품명"
        labelNumber="05"
        v-model="$v.data.goods.$model"
        :require="$v.data.goods.required"
        placeholder="상품명을 입력해주세요"
        requireMessage="상품명은 필수값 입니다"
      />

      <div class="registered-at">
        <div class="label-group">
          <label>06 </label>
          <label>단가</label>
        </div>
        <div class="input-group">
          <PriceInput v-model="$v.data.unitPrice.$model" unit="원" />
        </div>
        <div class="invalid-feedback">
          <span class="required" v-if="!$v.data.unitPrice.required"
            >단가는 필수값 입니다</span
          >
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>07 </label>
          <label>갯수</label>
        </div>
        <div class="input-group">
          <PriceInput v-model="$v.data.count.$model" unit="개" />
        </div>
        <div class="invalid-feedback">
          <span class="required" v-if="!$v.data.count.required"
            >갯수는 필수값 입니다</span
          >
        </div>
      </div>

      <div class="registered-at total-price">
        <div class="label-group">
          <label>08 </label>
          <label>총액</label>
        </div>
        <div class="input-group">
          <el-input v-model="totalPrice" disabled>
            <span slot="suffix">원</span>
          </el-input>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>09 </label>
          <label>위수금</label>
        </div>
        <div class="input-group">
          <PriceInput v-model="data.outstanding" unit="원" />
        </div>
      </div>

      <TextInput
        label="메모"
        labelNumber="10"
        v-model="data.memo"
        placeholder="메모를 입력해주세요"
      />

      <BottomActionBar>
        <el-button v-loading="isSaving" @click="saveOrder">기입</el-button>
      </BottomActionBar>
    </section>
  </MainLayout>
</template>

<script>
import _ from "lodash";
import MainLayout from "@/router/layouts/MainLayout";
import TextInput from "@/components/TextInput";
import PriceInput from "@/components/PriceInput";
import BottomActionBar from "@/components/BottomActionBar";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

const DEFAULT_DATA = {
  type: true,
  date: null,
  price: null,
  memo: null,
  goods: null,
  unitPrice: null,
  count: null,
  outstanding: 0,
  userId: null,
  userName: null
};

export default {
  components: {
    MainLayout,
    TextInput,
    PriceInput,
    BottomActionBar
  },
  data() {
    return {
      data: { ...DEFAULT_DATA },
      edit: false,
      keyword: null,
      loading: false,
      search: false,
      showMeber: false,
      isSaving: false
    };
  },

  mixins: [validationMixin],
  validations: {
    data: {
      userId: { required },
      date: { required },
      goods: { required },
      unitPrice: { required },
      count: { required }
    }
  },

  async created() {
    this.loading = true;
    if (this.loginUser) {
      this.$store.dispatch("users/getUser", this.loginUser.id);
    }
    this.loading = false;
  },

  computed: {
    loginUser() {
      return this.$store.getters["loginUser/loginUser"];
    },

    userList() {
      if (!this.$store.getters["users/user"]) {
        this.$store.dispatch("users/getUser", this.loginUser.id);
      }
      return this.$store.getters["users/user"];
    },

    totalPrice() {
      return this.$filters.comma(this.data.unitPrice * this.data.count);
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
      this.keyword = name;
      if (this.search) {
        this.data.userId = id;
        this.data.userName = name;
      } else {
        this.data.userId = null;
      }
    },

    formatMobile(phone) {
      return this.$filters.mobile(phone);
    },

    showMemberList() {
      if (!this.search) this.showMeber = !this.showMeber;
    },

    valid() {
      const checkType = [
        { value: "userId", text: "회사를" },
        { value: "date", text: "거래일을" },
        { value: "goods", text: "상품명을" },
        { value: "unitPrice", text: "단가를" },
        { value: "count", text: "갯수를" }
      ];

      const message = this.$utils.validate.checkAlertMessage(
        this.data,
        checkType
      );

      if (message) {
        this.alertMessage(message, "매출/매입 추가 실패");
        return false;
      }

      return true;
    },

    alertMessage(message, title) {
      this.isSaving = false;
      this.$alert(message, title, { showClose: false });
    },

    async saveOrder() {
      if (!this.valid()) return;
      this.isSaving = true;

      const params = {
        ...this.data,
        date: Number(this.data.date.split("-").join("")),
        price: this.data.unitPrice * this.data.count,
        companyUid: this.loginUser.id
      };

      const res = await this.$api.order.createOrder(this.data.userId, params);
      if (res.status === 200) {
        this.isSaving = false;
        this.$message("주문 정보 추가 완료");
        this.data = _.cloneDeep(DEFAULT_DATA);
        this.search = !this.search;
        this.$v.$reset();
      } else {
        this.isSaving = false;
        this.$message("주문 정보 추가 실패. 관리자에게 문의하세요");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.select-user {
  display: flex;
  width: 400px;
  ::v-deep .el-input {
    width: 200px;
  }
  ::v-deep .el-input__inner {
    border-radius: 80px;
    width: 200px;
  }
  .required {
    line-height: 40px;
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

.registered-at,
.name {
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
.invalid-feedback {
  height: 15px;
  .required {
    color: red;
    margin-left: 30px;
    font-size: 13px;
  }
}
.error {
  border: 1px solid red;
  border-radius: 4px;
  ::v-deep .el-input__inner {
    border: none;
  }
}
.total-price {
  ::v-deep .el-input__inner {
    text-align: right;
  }
  ::v-deep .el-input__suffix-inner {
    line-height: 40px;
  }
}
.no-have {
  color: #909399;
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
}
</style>
