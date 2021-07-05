<template>
  <v-card>
    <v-card-title>Log In</v-card-title>
    <v-divider />
    <div class="ma-4">
      <v-btn block color="primary" @click="handleFortyTwoLogIn"
        ><v-icon>$vuetify.icons.fortytwo</v-icon></v-btn
      >
    </div>
    <v-form v-model="valid" ref="form">
      <v-card-text>
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernameRules"
          required
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          required
          prepend-inner-icon="mdi-lock"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" block tile color="primary" @click="validate">
          Log In
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import authentifier from "@/services/authentifier";

export default {
  name: "LogInCard",
  data() {
    return {
      valid: false,
      username: "",
      usernameRules: [(v) => !!v || "Username is required"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    ...mapActions("auth", ["logIn", "logInFortyTwo"]),
    validate() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const credentials = { username: this.username, password: this.password };
      this.logIn(credentials);
    },
    handleFortyTwoLogIn() {
      authentifier.logInFortyTwo().then(({ data: redirectURI }) => {
        window.location.href = redirectURI;
      });
    },
  },
};
</script>

<style>
</style>
