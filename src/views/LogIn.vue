<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="12" md="6" lg="4" xl="2">
        <log-in-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LogInCard from "@/components/LogInCard.vue";

export default {
  components: { LogInCard },
  name: "LogIn",
};
</script>

<style>
</style>
