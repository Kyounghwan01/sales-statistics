<template>
  <div class="hello">
    <div class="div">123</div>
    <ul>
      <li v-for="member in data" :key="member._ud">
        {{ member.name }}
        {{ member.content }}
      </li>
      <el-time-select
        format="HH:mm"
        value-format="HH:mm"
        v-model="bookingLimitTime"
        :picker-options="{ start: '00:00', step: '00:01', end: '23:59' }"
        :clearable="false"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
// import axios from "axios";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      data: [] as unknown,
      time: "2020-01-23 10:00" as string
    };
  },
  computed: {
    bookingLimitTime: {
      get(): string {
        return moment(this.time).format("HH:mm");
      },
      set(value: string) {
        this.time = `${this.time.slice(0, -6)} ${value}`;
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
