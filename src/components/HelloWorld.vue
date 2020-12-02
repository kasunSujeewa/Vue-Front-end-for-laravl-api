<template>
  <v-container>
    <ul>
      <li>
        {{ users.name }}
      </li>
    </ul>
  </v-container>
</template>
<script>
import axios from "axios";
import { bus } from "../main";
import router from "../router";
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser: function () {
      axios
        .get("http://127.0.0.1:8000/api/currentUser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data;
          bus.$emit("logged", this.users);
        })
        .catch((error) => {
          this.error = error.response.data.message;
          router.push("/");
        });
    },
  },
};
</script>