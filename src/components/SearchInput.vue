<template>
  <v-text-field
    dark
    v-model="patternListener"
    class="flex-grow-0"
    prepend-inner-icon="mdi-magnify"
    append-icon="mdi-arrow-right"
    :label="label"
    dense
    single-line
    clearable
    outlined
    background-color="grey darken-3"
    color="primary"
    hide-details
    @keypress.enter="searchHandler"
  />
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    pattern: String,
    label: String,
    searchHandler: Function
  },
  computed: {
    patternListener: {
      get() {
        return this.pattern;
      },
      set(value) {
        this.$emit('update:pattern', value);
      },
    },
  },
};
</script>
