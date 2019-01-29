<template>
  <v-app dark>
    <tool-bar
      app
      :is-recipe-page="!!recipePage"
    />
    <v-content>
      <v-container :class="recipePage">
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar.vue';

export default {
  name: 'App',
  components: { ToolBar },
  data() {
    return {
      //
    };
  },
  computed: {
    recipePage() {
      return this.$route.name === 'recipe' ? 'vis-container' : '';
    },
  },
};
</script>
