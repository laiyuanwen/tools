<template>
  <HomePage/>
</template>

<script lang="ts">
import HomePage from "@/page/HomePage.vue";

export default {
  name: 'App',
  components: { HomePage },
  mounted() {
    // TODO 迁移
    this.$store.dispatch('project/syncCodeDir')
    window.onfocus = () => this.$store.dispatch('onfocus')
  }
}
</script>

<style>
body {
  margin: 0
}

.el-drawer__body {
  --el-drawer-padding-primary: 0
}
</style>
