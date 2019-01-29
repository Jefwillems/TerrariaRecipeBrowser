import { map, parseInt } from 'lodash';
import types from './types';
import { getNetworkForItem, counter } from '../util';

/**
 *
 * @param {number} amount amount of chars to parse
 * @param {String} x string to parse
 */
const extractAmountFromEnd = amount => x => parseInt(x.substr(x.length - amount).replace(/[^0-9.]/g, ''));
const lastFive = extractAmountFromEnd(5);

export default {
  [types.UPDATE_RECIPES](state, recipes) {
    state.raw_data = recipes;
    const {
      feed: { entry: rawEntries },
    } = recipes;
    const extractedEntries = map(rawEntries, entry => ({
      name: entry.gsx$item.$t,
      needHoney: entry.gsx$needhoney.$t,
      needWater: entry.gsx$needwater.$t,
      anyIronbar: entry.gsx$anyironbar.$t,
      anyWood: entry.gsx$anywood.$t,
      requiredItems: entry.gsx$requireditems.$t,
      requiredTiles: entry.gsx$requiredtiles.$t,
    }));
    const count = counter(0);
    state.recipes = map(extractedEntries, entry => ({
      ...entry,
      id: count(),
      amount: lastFive(entry.name),
      name: entry.name.split(' (')[0],
      requiredItems: map(entry.requiredItems.split(' + '), item => ({
        type: item.split(' (')[0],
        amount: lastFive(item),
      })),
    }));
  },
  [types.UPDATE_SELECTED_RECIPE](state, val) {
    state.selected_recipe = val;
  },
  [types.BUILD_SELECTED_RECIPE](state) {
    state.selected_recipe_build = getNetworkForItem(state.recipes, state.selected_recipe);
  },
};
