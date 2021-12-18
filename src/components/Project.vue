<template>
  <div @click="openProject"
       class="project">
    <img :src="this.icon" width="32" height="32" :style="{marginRight:'10px'}"/>

    <div :style="{display:'flex',flexDirection:'column',flexGrow:1,alignItems:'flex-start'}">
      <el-tag effect="dark" type="danger">{{ this.branch }}</el-tag>
      <div :style="{ color: 'red', fontSize:  '16px' }">{{ project.name || "项目名称" }}</div>
      <div>{{ project.path }}</div>
    </div>

    <IDESelect :onChange="selectIDE" :default-selected="project.openType"/>

    <el-button type="danger" @click.stop="deleteProject">删除</el-button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import IDESelect from "./IDESelect";
import {currentBranch} from "@/utils/git";
import {ProjectStore} from "@/utils/cache/ProjectStore";
import {openProject} from "@/utils";

export default {
  name: "Project",
  components: {IDESelect},
  props: {
    project: Object,
  },
  computed: {
    icon: function () {
      return this.project.icon || require("../assets/icon_default_project.png")
    },
    openTime: function () {
      return dayjs(this.project.openTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      branch: ""
    }
  },
  mounted() {
    currentBranch(this.project.path).then((b) => {
      this.branch = b
    })
    window.addEventListener('focus', () => {
      currentBranch(this.project.path).then((b) => {
        this.branch = b
      })
    });
  },
  methods: {
    selectIDE(type) {
      ProjectStore.updateProjectOnOpen(type, this.project.path)
      openProject(type, this.project.path)
    },
    openProject() {
      ProjectStore.updateProjectOnOpen(this.project.openType, this.project.path)
      openProject(this.project.openType, this.project.path)
    },
    deleteProject() {
      ProjectStore.deleteProject(this.project.path)
    }
  },
};
</script>

<style scoped>
.project {
  display: flex;
  padding: 8px;
  background: #42b983;
  margin-top: 20px
}

.project:hover {
  background: #3ba877
}
</style>