<template>
  <div class="home">
    <v-container style="margin-top: 50px">
      <v-row justify="space-around">
        <v-card
          width="400"
          height="400"
          color="blue lighten-4"
          elevation="11"
          shaped
        >
          <h1 class="text-center mt-3" style="color: #546e7a; font-size: 50px">
            Login
          </h1>
          <v-alert
            dense
            outlined
            type="error"
            v-if="notmatching"
            style="margin-bottom: -25px; margin-left: 25px; margin-right: 25px"
          >
            Email or Password Wrong
          </v-alert>
          <form style="padding: 20px; padding-top: 50px" submit>
            <v-text-field
              label="E-mail"
              v-model="logindata.email"
              :rules="emailRules"
              type="email"
              outlined
            >
            </v-text-field>
            <v-text-field
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="logindata.password"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              outlined
              @click:append="show1 = !show1"
            >
            </v-text-field>
            <v-btn
              text
              rounded
              color="success"
              small
              @click="loginfun(logindata)"
            >
              <v-icon left>mdi-account-key</v-icon> Login
            </v-btn>

            <v-btn
              text
              rounded
              color="primary"
              small
              style="text-decoration: none"
            >
              <router-link to="/about"
                ><v-icon>mdi-account-edit</v-icon>Register New</router-link
              >
            </v-btn>
          </form>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router/index";
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      logindata: {
        email: "",
        password: "",
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      notmatching: false,
    };
  },
  methods: {
    loginfun(logindata) {
      axios
        .post("http://127.0.0.1:8000/api/login", logindata)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          router.push("/hello");
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.notmatching = true;
        });
    },
  },
};
</script>
