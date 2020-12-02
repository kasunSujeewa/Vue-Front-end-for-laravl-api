<template>
  <div class="Register">
    <v-container style="margin-top: 50px">
      <v-row justify="space-around">
        <v-card
          width="400"
          height="550"
          color="blue lighten-4"
          elevation="11"
          shaped
        >
          <h1 class="text-center mt-3" style="color: #546e7a; font-size: 50px">
            Register
          </h1>
          <v-alert
            dense
            outlined
            type="error"
            v-if="notmatching"
            style="margin-bottom: -25px; margin-left: 25px; margin-right: 25px"
          >
            Email Already taken
          </v-alert>
          <form style="padding: 20px; padding-top: 50px">
            <v-text-field
              label="Name"
              v-model="regDetails.name"
              required
              type="text"
              outlined
            >
            </v-text-field>
            <v-text-field
              label="E-mail"
              v-model="regDetails.email"
              :rules="emailRules"
              type="email"
              outlined
            >
            </v-text-field>
            <v-text-field
              label="Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="regDetails.password"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              outlined
              @click:append="show = !show"
            >
            </v-text-field>
            <v-text-field
              label="Password Confirmation"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="regDetails.password_confirmation"
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
              @click="registerFun(regDetails)"
            >
              <v-icon left>mdi-account-edit</v-icon> Register
            </v-btn>

            <v-btn
              text
              rounded
              color="primary"
              small
              style="text-decoration: none"
            >
              <router-link to="/"
                ><v-icon>mdi-account-key</v-icon>Already Registered</router-link
              >
            </v-btn>
          </form>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router/index";
export default {
  data() {
    return {
      regDetails: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      show1: false,
      show: false,
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
    registerFun(regDetails) {
      axios
        .post("http://127.0.0.1:8000/api/signup", regDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
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
