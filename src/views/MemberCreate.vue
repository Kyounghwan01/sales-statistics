<template>
  <MainLayout :padded="false">
    <section class="create-user">
      <div class="header">
        <h3>{{ edit ? '고객 수정' : '고객 추가' }}</h3>
        <el-tooltip class="item" effect="light" placement="top">
          <p v-if="edit" slot="content">
            고객 추가를 위해 필수항목을 적고 수정 버튼을 누르세요<br />
            고객 삭제시 삭제 버튼을 누르세요
          </p>
          <p v-else slot="content">
            고객 추가를 위해 필수항목을 적고 등록 버튼을 누르세요
          </p>
          <i class="el-icon-question" :style="{ color: '#64AEFF', fontSize: '18px' }"></i>
        </el-tooltip>
      </div>

      <TextInput
        label="회사명"
        labelNumber="01"
        v-model="$v.data.name.$model"
        :require="$v.data.name.required"
        placeholder="회사명을 입력해주세요"
        requireMessage="회사명은 필수값 입니다"
      />

      <PhoneInput
        label="휴대폰번호"
        labelNumber="02"
        v-model="$v.data.phone.$model"
        :require="$v.data.phone.required"
        placeholder="휴대폰 번호를 입력해주세요"
        requireMessage="휴대폰 번호는 필수값 입니다"
      />

      <TextInput
        label="주소"
        labelNumber="03"
        v-model="$v.data.address.$model"
        :require="$v.data.address.required"
        placeholder="주소를 입력해주세요"
        requireMessage="주소는 필수값 입니다"
      />

      <TextInput
        label="등록일"
        labelNumber="04"
        v-model="$v.data.registreDate.$model"
        :require="$v.data.registreDate.required"
        placeholder="등록일을 입력해주세요"
        requireMessage="등록일을 필수값 입니다"
        type="date"
      />

      <TextInput
        label="비고"
        labelNumber="05"
        v-model="data.content"
        placeholder="비고를 입력해주세요. 필수 값은 아닙니다"
      />

      <BottomActionBar>
        <el-button v-if="!edit" v-loading="isSaving" @click="registredUser">등록</el-button>
        <el-button type="danger" v-if="edit" plain v-loading="isSaving" @click="deleteUser">삭제</el-button>
        <el-button v-if="edit" v-loading="isSaving" @click="updateUser">수정</el-button>
      </BottomActionBar>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from '@/router/layouts/MainLayout';
import BottomActionBar from '@/components/BottomActionBar';
import TextInput from '@/components/TextInput';
import PhoneInput from '@/components/PhoneInput';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    MainLayout,
    BottomActionBar,
    TextInput,
    PhoneInput,
  },
  data() {
    return {
      data: {
        name: null,
        registreDate: null,
        phone: null,
        address: null,
        content: null,
      },
      isSaving: false,
      edit: false,
    };
  },

  mixins: [validationMixin],
  validations: {
    data: {
      name: { required },
      registreDate: { required },
      phone: { required },
      address: { required },
    },
  },

  created() {
    if (this.$route.params.id) {
      this.edit = true;
      this.data = this.$route.query;
    }
  },

  computed: {
    loginUser() {
      return this.$store.getters['loginUser/loginUser'];
    },
  },

  methods: {
    valid() {
      const checkType = [
        { value: 'name', text: '회사명을' },
        { value: 'phone', text: '휴대폰 번호를' },
        { value: 'address', text: '주소를' },
        { value: 'registreDate', text: '등록일을' },
      ];

      const message = this.$utils.validate.checkAlertMessage(this.data, checkType);

      if (message) {
        this.alertMessage(message, '회원 추가 실패');
        return false;
      }

      return true;
    },

    alertMessage(message, title) {
      this.isSaving = false;
      this.$alert(message, title, { showClose: true });
    },

    async registredUser() {
      if (!this.valid()) return;
      this.isSaving = true;
      const res = await this.$api.user.createUser({
        ...this.data,
        password: this.data.phone,
        companyUid: this.loginUser.id,
      });

      if (res.status === 200) {
        this.alertMessage('회원 추가 성공하였습니다.', '회원 추가 성공');
        this.$router.push('/users');
      } else {
        this.alertMessage('회원 추가 실패하였습니다. 다시 시도해주세요', '회원 추가 실패');
        this.$router.push('/users');
      }
    },

    async updateUser() {
      if (!this.valid()) return;
      this.isSaving = true;

      const res = await this.$api.user.updateUser(this.data, this.$route.params.id);
      if (res.status === 200) {
        this.alertMessage('회원 수정을 성공하였습니다.', '회원 수정 성공');
        this.$router.push('/users');
      } else {
        this.alertMessage('관리자에게 문의해주세요', '회원 수정 실패');
      }
    },

    async deleteUser() {
      this.isSaving = true;
      const res = await this.$api.user.deleteUser(this.$route.params.id);
      if (res.status === 200) {
        this.alertMessage('회원 삭제 성공하였습니다.', '회원 삭제 성공');
        this.$router.push('/users');
      } else {
        this.alertMessage('관리자에게 문의해주세요', '회원 삭제 실패');
      }
    },
  },
};
</script>

<style lang="scss" scope>
.header {
  display: flex;
  p {
    width: 10px;
  }
  i {
    margin: 22px 0 0 10px;
  }
  i:hover {
    cursor: help;
  }
}
.create-user {
  padding: 10px 200px;
  overflow-y: auto;
  height: 85vh;
  h3 {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: normal;
    margin: 14px 0;
  }

  ::v-deep .el-input {
    width: 70%;
  }
  ::v-deep .el-button {
    height: 35px;
    line-height: 6px;
    width: 70px;
    margin-right: 20px;
  }
}
</style>
