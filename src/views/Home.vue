<template>
  <v-container class="flex-column fill-height">
    <hyper-search-box
      :class="searchClass"
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
      pristine: true,

      pattern: "",
      categories: {},
      selectedCategories: [],

      defaultSearchClass: "d-flex align-center search-expand",
      topSearchClass: "d-flex align-center search-collapse",
    };
  },
  computed: {
    searchClass() {
      return this.pristine ? this.defaultSearchClass : this.topSearchClass;
    },
    categoryNames() {
      return Object.keys(this.categories);
    },
    categoryValues() {
      return this.selectedCategories.map(c => this.categories[c])
    }
  },
  methods: {
    async handleSearch() {
      const response = await service.search(this.pattern, this.categoryValues);
      this.pristine = false;
      console.log(response);
    },
  },
};
</script>

<style scoped>

h1 {
  font-size: 4.5em;
}

.search-expand {
  flex-grow: 1;
  transition: flex-grow 0.3s ease-in;
}

.search-collapse {
  flex-grow: 0;
  transition: flex-grow 0.3s ease-in;
}

</style>
