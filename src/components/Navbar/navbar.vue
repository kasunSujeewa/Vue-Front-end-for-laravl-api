<template>
  <nav>
    <v-app-bar dark class="gray" absolute app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="p-2 gray--text">
        <span class="font-weight-light">SUSL</span>
        <span class="subtitle-1">Social</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small text rounded @click="logoutFun()" v-if="currentuser.name">
        <span>Logout</span>
        <v-icon left>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>
<script>
import router from "../../router";
import axios from "axios";
import { bus } from "../../main";
export default {
  data() {
    return {
      currentuser: [],
    };
  },
  mounted() {},
  methods: {
    logoutFun() {
      axios
        .get("http://127.0.0.1:8000/api/logout", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data.message);
          router.push("/");
          this.currentuser = "";
          localStorage.removeItem("token");
        });
    },
  },
  created() {
    bus.$on("logged", (data) => {
      this.currentuser = data;
    });
  },
};
</script>