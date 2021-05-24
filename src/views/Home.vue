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
      :items="searchResult"
      :loading="loading"
      :content.sync="selectedContent"
    />
    <hyper-media-dialog :open.sync="openDialog" />
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
      selectedContent: [],

      searchResult: [],

      expandSearchClass: "d-flex align-center search-expand",
      collapseSearchClass: "d-flex align-center search-collapse",
    };
  },
  watch: {
    selectedContent() {
      this.openDialog = true;
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
  },
  methods: {
    async handleSearch() {
      if (this.pristine) {
        this.pristine = false;
      }
      this.loading = true;
      const response = await service.search(this.pattern, this.categoryValues);
      this.loading = false;

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
