<template>
  <v-container>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers: function () {
      axios.get("http://127.0.0.1:8000/api/users").then((resposne) => {
        this.users = resposne.data;
      });
    },
  },
};
</script>