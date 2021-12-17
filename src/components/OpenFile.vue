<template>
  <div class="hello">
    <Project v-for="(project, index) in projects" :key="index" :project="project"/>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";
import {Channel} from "@/Constant";
import Project from "./Project";

export default {
  name: "HelloWorld",
  components: {Project},
  props: {
    msg: String,
  },
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    ipcRenderer.on(Channel.PROJECT_CHANNEL, (event, projects) => {
      this.projects = projects
    })
    ipcRenderer.invoke(Channel.GET_PROJECT_LIST).then((projects) => {
      this.projects = projects
    })
  },
  methods: {},
};
</script>