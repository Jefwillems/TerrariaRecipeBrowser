<template>
  <network />
</template>
<script>
import { mapGetters } from 'vuex';
import Network from '../components/Network.vue';
import types from '../store/types';

export default {
  components: { Network },
  computed: {
    ...mapGetters(['selected_recipe']),
  },
  mounted() {
    if (!this.selected_recipe.name) {
      this.$router.push({ name: 'home' });
    } else {
      this.$store.commit(types.BUILD_SELECTED_RECIPE);
    }
  },
};
</script>
<style>

</style>
