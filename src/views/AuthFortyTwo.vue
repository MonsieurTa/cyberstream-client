<template>
  <div />
</template>

<script>
import authentifier from "@/services/authentifier";
import { mapActions } from "vuex";

export default {
  name: "AuthFortyTwo",
  mounted() {
    this.params = {
      state: this.$route.query?.state || "",
      code: this.$route.query?.code || "",
    };
  },
  data() {
    return {
      loading: false,
      params: {
        state: "",
        code: "",
      },
    };
  },
  watch: {
    async params(newValue) {
      const { state, code } = newValue;

      if (state === "" || code === "") {
        console.error(`state: ${state} | code: ${code}`);
        return;
      }

      const headers = await authentifier
        .getFortyTwoToken(code, state)
        .then(({ headers }) => headers);

      const token = headers["authorization"];
      this.authenticate(token);
      this.$router.push({ name: "Home" });
    },
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
  },
};
</script>

<style>
</style>
