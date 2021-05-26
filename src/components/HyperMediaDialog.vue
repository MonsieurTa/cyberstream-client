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
      <hyper-player v-if="!disposePlayer" :src="playerSource" :options="playerOptions" />
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
      playerSource: null,
      playerOptions: {
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
    disposePlayer() {
      return this.playerSource === null || this.openListener === false;
    },
    source() {
      console.log(this.hlsUrl);
      return {
        src: this.hlsUrl,
        type: "application/x-mpegURL",
      };
    },
  },
  methods: {
    async handleClick() {
      this.loading = true;

      const hlsUrl = await service.stream(
        this.content.Title,
        this.content.MagnetUri
      ).then(({ data }) => data);
      this.playerSource = {
        src: hlsUrl,
        type: "application/x-mpegURL",
      };

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
