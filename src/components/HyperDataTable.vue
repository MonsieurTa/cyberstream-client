<template>
  <v-container>
    <v-data-table
      dark
      dense
      v-model="contentListener"
      single-select
      :loading="loading"
      :headers="headers"
      :items="items"
      item-key="Guid"
      sort-by="Seeders"
      :sort-desc="true"
      @click:row="handleClick"
      mobile-breakpoint="0"
    >
      <template v-slot:[`item.Size`]="{ item }">
        {{ readableDataSize(item.Size) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { convertDataUnit } from "@/utils/conversion";

export default {
  name: "HyperDataTable",
  props: {
    items: Array,
    loading: Boolean,
    content: Array,
  },
  data() {
    return {
      headers: [
        {
          text: "Torrent name",
          value: "Title",
        },
        {
          text: "Size",
          value: "Size",
        },
        {
          text: "Seeders",
          value: "Seeders",
        },
        {
          text: "Publish date",
          value: "PublishDate",
        },
        {
          text: "Tracker",
          value: "Tracker",
        },
      ],
    };
  },
  computed: {
    contentListener: {
      get() {
        return this.content;
      },
      set(v) {
        this.$emit("update:content", v);
      },
    },
  },
  methods: {
    handleClick(_, row) {
      row.select(!row.isSelected);
    },
    readableDataSize(strSize) {
      return convertDataUnit(parseInt(strSize));
    },
  },
};
</script>

<style>
</style>
