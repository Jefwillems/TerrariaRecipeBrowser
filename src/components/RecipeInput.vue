<template>
  <v-autocomplete
    :items="recipes"
    item-text="name"
    color="white"
    hide-selected
    label="Recipes"
    placeholder="Start typing to search Recipes"
    return-object
    @change="select"
  />
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['recipes']),
  },
  methods: {
    select(val) {
      this.$emit('selected', val);
    },
  },
};
</script>
