<template>
  <div>
    <MainHeader class="main__header" />
    <section class="main__contents" :class="{ padded }">
      <slot />
    </section>
  </div>
</template>

<script lang="ts">
import MainHeader from "../../components/MainHeader/index.vue";

export default {
  components: { MainHeader },

  props: {
    padded: { type: Boolean, default: true },
    borderTop: { type: String }
  },

  computed: {
    // studio() {
    //   return this.$store.getters['studio/studio'];
    // },
    // isLoggedIn() {
    //   return this.$store.getters['auth/isLoggedIn'];
    // },
    // expireOn() {
    //   return _.get(this.studio, 'expire_on');
    // },
    // expireIn() {
    //   return this.$utils.getDaysDiff(this.expireOn);
    // },
    // showExpirationNotice() {
    //   return this.studio.name && 0 <= this.expireIn && this.expireIn <= 7;
    // },
    // showExpirationAlert() {
    //   return this.isLoggedIn && this.expireIn < 0;
    // },
    // expirationAlertTitle() {
    //   if (this.expireIn > 7) return null;
    //   let message = `${this.studio.name} 서비스 계정 만료일은 <b>${this.$filters.dateKorean(
    //     this.expireOn,
    //   )}</b> 입니다. 기간 연장은 카카오톡 플러스친구 ‘스튜디오메이트’ 또는 고객센터로 문의주세요. (02-6952-5533, 5366)`;
    //   if (this.expireIn === 0) {
    //     message = `${this.studio.name} 서비스 <b>계정 만료</b>일입니다. 내일부터 사용이 제한됩니다. 기간 연장은 카카오톡 플러스친구 ‘스튜디오메이트’ 또는 고객센터로 문의주세요. (02-6952-5533, 5366)`;
    //   }
    //   return message;
    // },
    // contentStyle(): any {
    //   if (!this.borderTop) return null;
    //   return {
    //     borderTop: `3px solid ${this.borderTop}`
    //   };
    // }
  },

  // watch: {
  //   $route: {
  //     handler: 'checkExpiration',
  //     immediate: true,
  //   },
  //   expireIn() {
  //     this.checkExpiration();
  //   },
  // },

  methods: {
    // checkExpiration() {
    //   if (this.showExpirationAlert) {
    //     const title = '이용기간 만료';
    //     const message =
    //       '<b>이용기간이 만료</b>되었습니다.<br>기간 연장은 카카오톡 플러스친구 ‘스튜디오메이트’<br>또는 고객센터로 문의주세요. (02-6952-5533, 5366)';
    //     this.$alert(message, title, {
    //       dangerouslyUseHTMLString: true,
    //       showClose: false,
    //     })
    //       .then(() => {
    //         this.$router.push({ name: 'logout' });
    //       })
    //       .catch(() => {});
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 99vw;
  height: 99vh;
  overflow: hidden;

  /* display: grid;
  grid-template-columns: 55px calc(100vw - 55px);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'notification header'
    'notification contents'; */

  &__header {
    grid-area: header;

    &__error {
      background: #fef0f0;
      color: red;
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  &__notification {
    grid-area: notification;
  }

  &__contents {
    position: relative;
    overflow-y: auto;
    grid-area: contents;

    &.padded {
      padding: 10px;

      /* @include mq(768px) {
        padding: 30px;
      } */
    }
  }
}
</style>
