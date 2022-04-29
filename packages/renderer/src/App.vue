<template>
  <HomePage/>
</template>

<script>
import HomePage from "@/page/HomePage.vue";

export default {
  name: 'App',
  components: { HomePage },
  mounted() {
    console.log("hello");
    
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
</style>
