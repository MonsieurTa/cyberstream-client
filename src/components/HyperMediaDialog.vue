<template>
  <v-dialog v-model="openListener" max-width="800px">
    <v-card dark class="mx-auto" color="black">
      <v-app-bar color="black">
        <v-card-text>{{ content.Title }}</v-card-text>
        <v-spacer />
        <v-btn
          icon
          small
          left
          outlined
          rounded
          color="red"
          @click="handleClick"
        >
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn icon @click="openListener = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <hyper-player :options="options" />
    </v-card>
  </v-dialog>
</template>

<script>
import { convertDataUnit } from "@/utils/conversion";
import HyperPlayer from "@/components/HyperPlayer.vue";
import service from "@/services/hyper-stream";

export default {
  components: { HyperPlayer },
  name: "HyperMediaDialog",
  props: {
    open: Boolean,
    content: Object,
  },
  data() {
    return {
      loading: false,
      hlsUrl: null,
      defaultOptions: {
        html5: {
          hls: {
            overrideNative: true,
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },
        fluid: true,
        liveui: true,
        controls: true,
      },
    };
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
    sources() {
      return [
        {
          src:
            "http://localhost:8080/5adc0a432b8784081ee864ad7231cb388050f67f/out.m3u8",
          type: "application/x-mpegURL",
        },
      ];
    },
    options() {
      return {
        ...this.defaultOptions,
        sources: this.sources,
      };
    },
  },
  watch: {
    content() {
      console.log(this.content);
    },
  },
  methods: {
    async handleClick() {
      this.loading = true;
      this.hlsUrl = await service.stream(
        this.content.Title,
        this.content.MagnetUri
      );
      this.loading = false;
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
