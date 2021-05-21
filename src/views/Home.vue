<template>
  <v-container class="fill-height">
    <v-row>
      <v-spacer />
      <v-col cols="4" class="d-flex flex-column justify-center">
        <v-text-field
          dark
          v-model="pattern"
          class="flex-grow-0"
          prepend-inner-icon="mdi-magnify"
          append-icon="mdi-arrow-right"
          label="Looking for something to watch ?"
          dense
          single-line
          clearable
          outlined
          background-color="grey darken-3"
          color="primary"
          hide-details
        />
        <v-row>
          <v-spacer />
          <v-col v-for="name in categoryNames" :key="name" cols="3">
            <v-checkbox
              dark
              v-model="selectedCategories"
              :key="name"
              :label="name"
              :value="name"
              hide-details
            />
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import service from "@/services/hyper-jackett";

export default {
  name: "Home",
  async mounted() {
    service.fetchCategories().then((categories) => {
      this.categories = categories;
    });
  },
  data() {
    return {
      pattern: "",
      selectedCategories: [],
      categories: {},
    };
  },
  computed: {
    categoryNames() {
      return Object.keys(this.categories);
    },
  },
  methods: {},
};
</script>

<style scoped>
h1 {
  font-size: 4.5em;
}
</style>
