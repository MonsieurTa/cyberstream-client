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
    <hyper-data-table
      v-if="!pristine"
      :items="searchResults"
      :loading="loading"
      :content.sync="selectedContents"
    />
    <hyper-media-dialog :open.sync="openDialog" :content="selectedContent" />
  </v-container>
</template>

<script>
import service from "@/services/hyper-jackett";
import HyperSearchBox from "@/components/HyperSearchBox.vue";
import HyperDataTable from "@/components/HyperDataTable.vue";
import HyperMediaDialog from "@/components/HyperMediaDialog.vue";

export default {
  components: { HyperSearchBox, HyperDataTable, HyperMediaDialog },
  name: "Home",
  async mounted() {
    service.fetchCategories().then((categories) => {
      this.categories = categories;
    });
  },
  data() {
    return {
      pristine: true,
      loading: false,
      openDialog: false,

      pattern: "",
      categories: {},

      selectedCategories: [],
      selectedContents: [],

      searchResults: [],

      expandSearchClass: "d-flex align-center search-expand",
      collapseSearchClass: "d-flex align-center search-collapse",
    };
  },
  watch: {
    openDialog(value) {
      if (value === false) {
        this.selectedContents = [];
      }
    },
    selectedContents(value) {
      if (value.length > 0) {
        this.openDialog = true;
      }
    },
  },
  computed: {
    searchClass() {
      return this.pristine ? this.expandSearchClass : this.collapseSearchClass;
    },
    categoryNames() {
      return Object.keys(this.categories);
    },
    categoryValues() {
      return this.selectedCategories.map((c) => this.categories[c]);
    },
    selectedContent() {
      const empty = (l) => l.length === 0;
      return empty(this.selectedContents) ? {} : this.selectedContents[0];
    },
  },
  methods: {
    async handleSearch() {
      if (this.pristine) {
        this.pristine = false;
      }

      this.loading = true;
      const results = await service.search(this.pattern, this.categoryValues);
      this.loading = false;

      this.searchResults = results;
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
