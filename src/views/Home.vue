<template>
  <v-container class="fill-height">
    <v-row>
      <v-spacer />
      <v-col cols="4">
        <h1 class="white--text">Looking for something to watch ?</h1>
      </v-col>
      <v-col cols="4" class="d-flex align-center">
        <v-select
          label="Category"
          single-line
          light
          rounded
          outlined
          dense
          background-color="white"
        ></v-select>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  font-size: 5em;
}
</style>
