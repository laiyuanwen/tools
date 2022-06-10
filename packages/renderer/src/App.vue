<template>
  <div class="home-container">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",
  components: { NavigationBar },
  mounted() {
    // 打包后 Electron 在载入的时候不会默认载入到 " / " 这个默认路径下
    this.$router.push("/project")
    console.log("hello");

    // TODO 迁移
    // this.$store.dispatch("project/syncCodeDir");
    // window.onfocus = () => this.$store.dispatch("onfocus");
  },
};
</script>

<style>
body {
  margin: 0;
}

.home-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
}
</style>
