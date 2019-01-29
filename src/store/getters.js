export default {
  recipes: ({ recipes }) => recipes,
  selected_recipe: ({ selected_recipe: selected }) => selected,
  nodes: ({ selected_recipe_build: build }) => build.nodes,
  edges: ({ selected_recipe_build: build }) => build.edges,
};
