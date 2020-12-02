<template>
  <v-app>
    <navbar></navbar>

    <v-main style="background: gray">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="scss">
</style>
<script>
import navbar from "./components/Navbar/navbar";
import axios from "axios";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      user: [],
    };
  },
  mounted() {},
};
</script>
