<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card
          dark
          color="primary lighten-1"
        >
          <v-card-title class="headline primary lighten-3">
            Search for Recipes
          </v-card-title>
          <v-card-text>
            <recipe-input @selected="select" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Loading recipes
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import types from '../store/types';
import RecipeInput from '../components/RecipeInput.vue';

export default {
  components: { RecipeInput },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['recipes']),
  },
  watch: {
    recipes(newVal) {
      if (newVal.length > 0) {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch(types.FETCH_RECIPES);
  },
  methods: {
    select(val) {
      this.$store.commit(types.UPDATE_SELECTED_RECIPE, val);
      this.$router.push({ name: 'recipe' });
    },
  },
};
</script>
