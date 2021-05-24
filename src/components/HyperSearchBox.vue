<template>
  <v-container>
    <v-row>
      <v-spacer class="hidden-md-and-down" />
      <v-col lg="4" sm="12" md="12" class="d-flex flex-column justify-center">
        <search-input
          :label="label"
          :pattern.sync="patternListener"
          :searchHandler="searchHandler"
        />
        <v-row>
          <v-spacer />
          <v-col v-for="name in categoryItems" :key="name" cols="3">
            <v-checkbox
              dark
              dense
              v-model="selectedCategoriesListener"
              :key="name"
              :label="name"
              :value="name"
              hide-details
            />
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-spacer class="hidden-md-and-down" />
    </v-row>
  </v-container>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";

export default {
  name: "HyperSearchBox",
  props: {
    pattern: String,
    selectedCategories: Array,
    label: String,
    categoryItems: Array,
    searchHandler: Function,
  },
  components: {
    SearchInput,
  },
  data() {
    return {};
  },
  computed: {
    patternListener: {
      get() {
        return this.pattern;
      },
      set(value) {
        this.$emit("update:pattern", value);
      },
    },
    selectedCategoriesListener: {
      get() {
        return this.selectedCategories;
      },
      set(value) {
        this.$emit("update:selectedCategories", value);
      },
    },
  },
};
</script>

<style>
</style>
