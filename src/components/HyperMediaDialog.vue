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
      <hyper-player
        v-if="!!playerSource"
        :src="playerSource"
        :tracks="playerTracks"
        :options="playerOptions"
      />
    </v-card>
    <v-snackbar v-model="showErrorSnackbar" :timeout="4000">
      {{ snackbarErrorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      playerTracks: null,
      playerOptions: {
        html5: {
          vhs: {
            overrideNative: true,
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },
        fluid: true,
        liveui: true,
        controls: true,
      },
      showErrorSnackbar: false,
      snackbarErrorMsg: "",
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
  },
  watch: {
    open: {
      handler: function (v) {
        if (!v) {
          this.playerSource = null;
          this.playerTracks = null;
        }
      },
    },
  },
  methods: {
    handleClick() {
      this.loading = true;

      const infoHash = this.content.InfoHash.toLowerCase();
      const { MagnetUri } = this.content;

      service
        .stream(infoHash, MagnetUri)
        .then((streamResp) => {
          const { src, tracks } = streamResp.toVideoJSContent();
          this.playerSource = src;
          this.playerTracks = tracks;
        })
        .catch((err) => {
          this.snackbarErrorMsg = err.message;
          this.showErrorSnackbar = true;
        })
        .finally(() => {
          this.loading = false;
        });
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
