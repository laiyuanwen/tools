<template>
  <div class="hello">
    <AddProject/>
    <open-file/>
  </div>
</template>

<script lang="ts">
import OpenFile from '../components/OpenFile.vue'
import AddProject from "./AddProject.vue";

export default {
  components: {AddProject, OpenFile},
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
