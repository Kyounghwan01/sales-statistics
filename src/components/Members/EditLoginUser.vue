<template>
  <el-dialog class="point-storage-dialog" :visible="show" @close="$emit('close')">
    <h4 slot="title">유저 정보 수정</h4>
    <div class="description">
      <TextInput
        type="text"
        label="이메일"
        labelNumber="1"
        v-model="edit.email"
        :require="edit.email ? true : false"
        placeholder="수정할 이메일을 입력해주세요"
        requireMessage="이메일은 필수값 입니다"
      />
      <TextInput
        type="text"
        label="이름"
        labelNumber="2"
        v-model="edit.name"
        :require="edit.name ? true : false"
        placeholder="수정한 사용자 이름을 입력해주세요"
        requireMessage="이름은 필수값 입니다"
      />
    </div>
    <div slot="footer">
      <el-button type="primary" @click="$emit('close', false, edit)">
        수정
      </el-button>
      <el-button @click="$emit('close', false)">
        닫기
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import TextInput from '@/components/TextInput';

export default {
  props: {
    show: Boolean,
    prevData: Object,
  },

  components: {
    TextInput,
  },

  data() {
    return {
      edit: {
        email: null,
        name: null,
      },
    };
  },

  created() {
    this.edit = { ...this.prevData };
  },
};
</script>

<style lang="scss" scoped>
.point-storage-dialog {
  /deep/ .el-dialog {
    max-width: 590px;
    &__header {
      padding: 20px 30px 0 30px;
    }
    &__body {
      padding: 0;
    }
  }
  .description {
    p {
      font-size: 15px;
    }
    &__accent {
      font-weight: bold;
      color: red;
    }
  }
}
</style>
