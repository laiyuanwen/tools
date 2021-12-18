<template>
  <div class="hello">
    <Project v-for="(project, index) in projects" :key="project.path" :project="project"/>
  </div>
</template>

<script>
import Project from "./Project";
import {ProjectStore} from "@/utils/cache/ProjectStore";

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
    this.projects = ProjectStore.getProjectList()
    ProjectStore.addListener((newValue) => {
      this.projects = newValue
    })
  },
  methods: {},
};
</script>