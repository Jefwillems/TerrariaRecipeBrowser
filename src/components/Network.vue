<template>
  <div class="container vis-container">
    <vis-network
      class="recipenet"
      :options="options"
      :nodes="nodes"
      :edges="edges"
    />
  </div>
</template>
<script>
import { Network as VisNetwork } from 'vue2vis';
import { mapGetters } from 'vuex';

export default {
  components: { VisNetwork },
  data() {
    return {
      options: {
        autoResize: true,
        height: '100%',
        width: '100vw',
        physics: false,
        layout: {
          hierarchical: {
            enabled: true,
            levelSeparation: 100,
            nodeSpacing: 200,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(['nodes', 'edges']),
  },
  watch: {},
};
</script>
<style>
@import "~vue2vis/dist/vue2vis.css";
.recipenet {
  height: 100%;
}
canvas {
  width: 100%;
}
.vis-container {
  max-width: none !important;
}
.container {
  height: 100%;
}
</style>
