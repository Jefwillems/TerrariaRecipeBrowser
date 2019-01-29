import { map, find, forEach } from 'lodash';
import uuid from 'uuid/v4';

const getRequiredItems = (entries, item) => {
  // ? required items = simple
  // ? populate required items
  // ? if no recipe -> give id and add.
  const added = [];
  const populateEntry = (requiredItem) => {
    let ret = find(entries, entry => entry.name === requiredItem.type);
    if (ret && ret.requiredItems && !find(added, a => a.name)) {
      // Recipe exists == has required item(s)
      ret.requiredItems = map(
        ret.requiredItems,
        nextLevelItem => populateEntry(nextLevelItem) || nextLevelItem,
      );
    } else {
      // No recipe exists for ret
      ret = {
        ...requiredItem,
        name: requiredItem.type,
        id: uuid(),
      };
    }
    added.push(ret);
    return ret;
  };
  const newProps = {};
  if (item.requiredItems) {
    // has children
    newProps.requiredItems = map(
      item.requiredItems,
      firstLevelItem => populateEntry(firstLevelItem) || firstLevelItem,
    );
  }
  // const firstLevel = item.requiredItems;
  // console.log(firstLevel);
  // if (firstLevel) {
  //   const items = map(firstLevel, (reqItem) => {
  //     const ret = find(entries, el => el.name === reqItem.type);
  //     if (ret) {
  //       // a recipe exists for reqItem
  //       const reqs = getRequiredItems(entries, ret);
  //       return {
  //         // ! Algorithm does not have history (iron bar -> iron fence -> iron bar)
  //         ...ret,
  //         requiredItems: reqs.requiredItems || [],
  //       };
  //     }
  //     return { name: reqItem.type, id: uuid(), amount: reqItem.amount };
  //   });
  //   return { ...item, requiredItems: items };
  // }
  // return { ...item };
  const mergedItem = { ...item, ...newProps };
  console.log('merged', mergedItem);
  return mergedItem;
};

const getNodesAndEdges = (entry) => {
  const nodes = [];
  const edges = [];
  const level = 1;
  nodes.push({ ...entry, label: `${entry.name} (${entry.amount})`, level });
  const reqItems = entry.requiredItems;

  const getItem = (items, idToLinkTo, withTile, currentLevel) => {
    // Add required Children as nodes

    nodes.push(
      ...map(items, i => ({ ...i, label: `${i.name} (${i.amount})`, level: currentLevel + 1 })),
    );
    // Add a Child to Parent edge for each required item
    edges.push(...map(items, i => ({ from: i.id, label: withTile, to: idToLinkTo })));
    forEach(items, (i) => {
      if (Array.isArray(i.requiredItems)) {
        // has child items
        getItem(i.requiredItems, i.id, i.requiredTiles, currentLevel + 1);
      }
    });
  };
  getItem(reqItems, entry.id, entry.requiredTiles, level);

  return { nodes, edges };
};

export default (entries, selectedEntry) => {
  const nestedItems = getRequiredItems(entries, selectedEntry);
  console.log(nestedItems);
  console.log(getNodesAndEdges(nestedItems));
  return getNodesAndEdges(nestedItems);
};
