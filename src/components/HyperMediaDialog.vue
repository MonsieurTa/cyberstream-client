<template>
  <v-dialog v-model="openListener" fullscreen>
    <v-card>
      <v-toolbar dark tile dense>
        <v-btn dark icon dense @click="openListener = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HyperMediaDialog",
  props: {
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
