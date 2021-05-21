<template>
  <v-container>
    <v-data-table
      dark
      :headers="headers"
      :items="items"
    />
  </v-container>
</template>

<script>
export default {
  name: 'HyperList',
  props: {
    items: Array,
  },
  data() {
      return {
        headers: [{
          text: 'Torrent name',
          value: 'Title',
        }],
      };
  },
}
</script>

<style>

</style>