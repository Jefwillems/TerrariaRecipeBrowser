import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    items: [],
    selected_recipe: {},
    selected_recipe_build: {
      nodes: [],
      edges: [],
    },
  },
  mutations,
  actions,
  getters,
});
