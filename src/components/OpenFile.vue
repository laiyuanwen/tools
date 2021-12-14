<template>
  <div class="hello">
    <h1 @click="greet">打开文件</h1>
    <p>{{projects}}</p>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";
import {Channel} from "../Constant";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    ipcRenderer.invoke(Channel.GET_PROJECT_LIST).then((projects) => {
      this.projects = projects
    })
  },
  methods: {
    greet() {
      ipcRenderer.send(Channel.OPEN_PROJECT, {
        type: "AndroidStudio",
        path: "/Users/bytedance/workspace/Android/MyApplication"
      });
    },
  },
};
</script>