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
export default {
  components: {
    navbar,
  },
};
</script>
