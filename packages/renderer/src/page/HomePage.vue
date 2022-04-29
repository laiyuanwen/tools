<template>
  <div class="home-container">
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "HomePage",
  components: { NavigationBar },
  data() {
    return {}
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
}
</style>