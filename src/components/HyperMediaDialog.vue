<template>
  <v-dialog v-model="openListener" max-width="800px">
    <v-card dark>
      <v-img class="d-flex align-end" :src="content.BannerUrl" height="600px">
        <v-btn icon class="close" @click="openListener = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 black" align="center" justify="center">
            Image not found.
          </v-row>
        </template>
        <div class="title ma-4 grey darken-4">
          <v-card-title>{{ content.Title }}</v-card-title>
          <v-btn class="ma-4"><v-icon left>mdi-play</v-icon>Play</v-btn>
        </div>
      </v-img>
    </v-card>
  </v-dialog>
</template>

<script>
import { convertDataUnit } from "@/utils/conversion";

export default {
  name: "HyperMediaDialog",
  props: {
    open: Boolean,
    content: Object,
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
  watch: {
    content() {
      console.log(this.content);
    },
  },
  methods: {
    readableDataSize(strSize) {
      return convertDataUnit(parseInt(strSize));
    },
  },
};
</script>

<style scope>
.close {
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px;
}
.title {
  border-radius: 8px;
  max-width: 500px;
}
</style>
