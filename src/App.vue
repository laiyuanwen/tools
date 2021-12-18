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
    window.onfocus = () => this.$store.dispatch('onfocus')
  }
}
</script>
