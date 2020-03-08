<template>
  <div class="hello">
    <div class="div">123</div>
    <ul>
      <li v-for="member in data" :key="member._ud">
        {{ member.name }}
        {{ member.content }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import axios from "axios";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      data: [] as unknown
    };
  }
  // computed() {

  // }
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
