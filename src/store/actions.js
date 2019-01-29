import axios from 'axios';
import types from './types';

const RECIPES = '1';
const ITEMS = '2';
const url = type => `https://spreadsheets.google.com/feeds/list/1nNsuMEK9a0HSucLt70NQu8F0fQPuZS7TCuN1WJYTTFE/${type}/public/values`;

export default {
  async [types.FETCH_RECIPES]({ commit }) {
    const { data } = await axios({
      url: url(RECIPES),
      responseType: 'json',
      params: { alt: 'json' },
      method: 'GET',
    });
    commit(types.UPDATE_RECIPES, data);
  },
  async [types.FETCH_ITEMS]({ commit }) {
    const { data } = await axios({
      url: url(ITEMS),
      responseType: 'json',
      params: { alt: 'json' },
      method: 'GET',
    });
    commit(types.UPDATE_ITEMS, data);
  },
};
