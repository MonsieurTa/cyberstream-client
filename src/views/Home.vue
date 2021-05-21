<template>
  <v-container class="fill-height">
    <hyper-search-box
      label="Watch something ?"
      :pattern.sync="pattern"
      :selectedCategories.sync="selectedCategories"
      :categoryItems="categoryNames"
      :searchHandler="handleSearch"
    />
  </v-container>
</template>

<script>
import service from "@/services/hyper-jackett";
import HyperSearchBox from '@/components/HyperSearchBox.vue';

export default {
  components: { HyperSearchBox },
  name: "Home",
  async mounted() {
    service.fetchCategories().then((categories) => {
      this.categories = categories;
    });
  },
  data() {
    return {
      pattern: "",
      categories: {},
      selectedCategories: [],
    };
  },
  computed: {
    categoryNames() {
      return Object.keys(this.categories);
    },
    categoryValues() {
      return this.selectedCategories.map(c => this.categories[c])
    }
  },
  methods: {
    async handleSearch() {
      const result = await service.search(this.pattern, this.categoryValues);
      console.log(result);
      return result;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 4.5em;
}
</style>
