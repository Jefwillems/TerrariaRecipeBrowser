<template>
  <v-toolbar app>
    <v-toolbar-title
      class="pointer"
      @click="goHome"
    >
      {{ titleText }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        flat
        href="https://github.com/Jefwillems/TerrariaRecipeBrowser/issues"
      >
        Bug report
      </v-btn>
      <v-btn
        flat
        href="https://docs.google.com/spreadsheets/d/1nNsuMEK9a0HSucLt70NQu8F0fQPuZS7TCuN1WJYTTFE/edit?usp=sharing"
      >
        Spreadsheet
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
// import RecipeInput from './RecipeInput.vue';

export default {
  components: {
    // RecipeInput,
  },
  props: {
    app: {
      type: Boolean,
      default: false,
    },
    isRecipePage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    titleText() {
      return this.isRecipePage ? 'Search another recipe' : 'Terraria Recipe search';
    },
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.pointer:hover {
  color: #aaa;
}
</style>
