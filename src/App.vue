<template>
  <v-app>
    <component :is="currentAppBar" />
    <v-main class="vmain">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../src/components/AppBar.vue";
import AppMap from "../src/components/AppMap.vue"

export default {
  data() {
    return {
      currentAppBar: AppBar
    };
  },
  watch: {
    $route(to, from) {
      this.updateAppBar();
    }
  },
  methods: {
    updateAppBar() {
      
      if (this.$route.meta.useCustomAppBar) {
        this.currentAppBar = AppMap;
      } else {
        this.currentAppBar = AppBar;
      }
    }
  },
  created() {
    this.updateAppBar();
  }
};
</script>

<style>

</style>
