<template>
  <ProjectListPage msg="Welcome to Your Vue.js App Electron"/>
</template>

<script lang="ts">
import ProjectListPage from './page/ProjectListPage.vue'

export default {
  name: 'App',
  components: {
    ProjectListPage
  },
  mounted() {
    this.$store.dispatch('project/syncCodeDir')
    window.onfocus = () => this.$store.dispatch('onfocus')
  }
}
</script>

<style>
.el-drawer__body {
  --el-drawer-padding-primary: 0
}
</style>
