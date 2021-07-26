<template>
  <v-snackbar v-model="openListener" :timeout="4000">
    {{ msg }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="openListener = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "ErrorSnackBack",
  props: {
    msg: String,
    open: Boolean,
  },
  computed: {
    openListener: {
      get() {
        return this.open;
      },
      set(v) {
        this.$emit("update:open", v);
      },
    },
  },
};
</script>

<style>
</style>
