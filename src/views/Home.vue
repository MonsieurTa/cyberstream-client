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
    <hyper-list
      v-if="!pristine"
      :items="searchResult"
    />
  </v-container>
</template>

<script>
import service from "@/services/hyper-jackett";
import HyperSearchBox from '@/components/HyperSearchBox.vue';
import HyperList from '@/components/HyperList.vue';

export default {
  components: { HyperSearchBox, HyperList },
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

      searchResult: [],

      expandSearchClass: "d-flex align-center search-expand",
      collapseSearchClass: "d-flex align-center search-collapse",
    };
  },
  computed: {
    searchClass() {
      return this.pristine ? this.expandSearchClass : this.collapseSearchClass;
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

      if (this.pristine) {
        this.pristine = false;
      }

      this.searchResult = response["Results"];
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
  transition: flex-grow 0.2s ease-in;
}

.search-collapse {
  flex-grow: 0;
  transition: flex-grow 0.2s ease-in;
}

</style>
