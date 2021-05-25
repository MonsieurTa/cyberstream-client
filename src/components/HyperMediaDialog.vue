<template>
  <v-dialog v-model="openListener" max-width="800px">
    <v-card dark class="mx-auto" color="black">
      <v-app-bar color="black">
        <v-card-text>{{ content.Title }}</v-card-text>
        <v-spacer />
        <v-btn icon small left outlined rounded color="red" @click="handleClick">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn icon @click="openListener = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <hyper-player/>
    </v-card>
  </v-dialog>
</template>

<script>
import { convertDataUnit } from "@/utils/conversion";
import HyperPlayer from '@/components/HyperPlayer.vue';

export default {
  components: { HyperPlayer },
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
    handleClick() {
      // request stream
      // wait first 1%
      // display player
    },
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
