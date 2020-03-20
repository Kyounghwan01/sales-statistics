<template>
  <div class="order-history">
    <div class="sales">
      <div class="registered-at">
        <div class="label-group">
          <label>01 </label>
          <label>매입 / 매출 : </label>
        </div>
        <div class="input-group radio-group">
          <el-radio v-model="data.type" :label="true">매입</el-radio>
          <el-radio v-model="data.type" :label="false">매출</el-radio>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>02 </label>
          <label>거래일 : </label>
        </div>
        <div class="input-group">
          <el-date-picker
            :class="
              $v.data.date.$dirty && !$v.data.date.required ? 'error' : null
            "
            v-model="$v.data.date.$model"
            type="date"
            placeholder="거래일을 입력해주세요"
            format="yyyy년 M월 d일"
            value-format="yyyy-MM-dd"
            :clearable="false"
          ></el-date-picker>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>03 </label>
          <label>상품명 : </label>
        </div>

        <div
          :class="[
            'input-group',
            $v.data.goods.$dirty && !$v.data.goods.required ? 'error' : null
          ]"
        >
          <el-input
            v-model="$v.data.goods.$model"
            class="goods-input"
            placeholder="상품명을 입력해주세요"
          ></el-input>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>04 </label>
          <label style="margin-right: 20px;">메 모 :</label>
        </div>
        <div class="input-group">
          <el-input
            class="goods-input"
            v-model="data.memo"
            placeholder="메모를 입력해주세요"
          ></el-input>
        </div>
      </div>
    </div>

    <div class="purchase">
      <div class="registered-at">
        <div class="label-group">
          <label>05 </label>
          <label>단가 :</label>
        </div>
        <div class="input-group">
          <PriceInput
            :class="
              $v.data.unitPrice.$dirty && !$v.data.unitPrice.required
                ? 'error'
                : null
            "
            v-model="$v.data.unitPrice.$model"
            unit="원"
          />
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>06 </label>
          <label>갯수 :</label>
        </div>
        <div class="input-group">
          <PriceInput
            :class="
              $v.data.count.$dirty && !$v.data.count.required ? 'error' : null
            "
            v-model="$v.data.count.$model"
            unit="개"
          />
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>07 </label>
          <label>총액 :</label>
        </div>
        <div class="input-group">
          <el-input v-model="totalPrice" disabled>
            <span slot="suffix">원</span>
          </el-input>
        </div>
      </div>

      <div class="registered-at">
        <div class="label-group">
          <label>08 </label>
          <label>위수금 :</label>
        </div>
        <div class="input-group">
          <PriceInput v-model="data.outstanding" unit="원" />
        </div>
        <span>없으면 0 원</span>
      </div>
    </div>
    <BottomActionBar>
      <el-button v-loading="isSaving" @click="saveOrder">저장</el-button>
      <!-- <el-button v-if="!edit" v-loading="isSaving" @click="registredUser"
          >등록</el-button
        > -->
    </BottomActionBar>
  </div>
</template>

<script>
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
  outstanding: 0
};

export default {
  components: {
    PriceInput,
    BottomActionBar
  },
  data() {
    return {
      isSaving: false,
      data: {
        type: true,
        date: null,
        price: null,
        memo: null,
        goods: null,
        unitPrice: null,
        count: null,
        outstanding: 0
      }
    };
  },

  mixins: [validationMixin],
  validations: {
    data: {
      type: { required },
      date: { required },
      goods: { required },
      unitPrice: { required },
      count: { required },
      outstanding: { required }
    }
  },

  computed: {
    totalPrice() {
      return this.$filters.comma(this.data.unitPrice * this.data.count);
    }
  },

  methods: {
    handleInputAmount(key) {
      console.log(key);
    },

    valid() {
      ["date", "goods", "unitPrice", "count"].forEach(key => {
        if (!this.$v.data[key].required) {
          this.$v.data[key].$touch();
        }
      });

      const title = "주문 추가 실패";
      let message = "주문 추가 실패하였습니다. 다시 시도해주세요";
      if (!this.data.date) {
        message = "주문일을 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.goods) {
        message = "상품명 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.unitPrice) {
        message = "단가를 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      } else if (!this.data.count) {
        message = "갯수를 입력해 주세요";
        this.$alert(message, title, { showClose: false });
        return false;
      }
      return true;
    },

    async saveOrder() {
      if (!this.valid()) return;

      this.isSaving = true;
      const newDate = Number(this.data.date.split("-").join(""));

      const res = await this.$api.order.createOrder(
        Number(this.$route.params.id),
        {
          ...this.data,
          date: newDate,
          price: this.data.count * this.data.unitPrice
        }
      );
      if (res.status === 200) {
        this.isSaving = false;
        this.$message("주문 정보 추가 완료");
        this.data = DEFAULT_DATA;
        this.$v.$reset();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-history {
  height: 95%;
  width: inherit;
  display: flex;
  .sales {
    width: 49%;
    margin: 10px;
  }
  .purchase {
    width: 49%;
    margin: 10px;
  }
}

.registered-at {
  height: 65px;
  display: flex;
  align-items: center;
  .label-group {
    line-height: 40px;
    label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .input-group {
    margin-left: 30px;
  }
  border-bottom: 1px solid #eee;
  padding: 25px;
}
/deep/ .el-input {
  width: 80%;
}
/deep/ .el-button {
  height: 35px;
  line-height: 6px;
  width: 70px;
  margin-right: 20px;
}

/deep/ .el-input__inner {
  text-align: right;
}
/deep/ .el-input__suffix {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.radio-group {
  line-height: 40px;
}
.goods-input {
  /deep/ .el-input__inner {
    width: 220px;
    text-align: left;
  }
}
.error {
  border: 1px solid red;
  border-radius: 4px;
  /deep/ .el-input__inner {
    border: none;
  }
}
</style>