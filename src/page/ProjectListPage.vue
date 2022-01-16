<template>
  <div class="hello">

    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="分类">
        分类1
      </a-tab-pane>
      <a-tab-pane key="2" tab="分类2">
        分类2
      </a-tab-pane>
      <a-tab-pane key="3" tab="分类3">
        分类3
      </a-tab-pane>

      <template #rightExtra>
        <AddProject/>
      </template>

    </a-tabs>

    <GitListDrawer/>
    <open-file/>
  </div>
</template>

<script lang="ts">
import OpenFile from '../components/OpenFile.vue'
import AddProject from "./AddProject.vue";
import GitListDrawer from "@/page/GitListDrawer.vue";

export default {
  components: { GitListDrawer, AddProject, OpenFile },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
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
