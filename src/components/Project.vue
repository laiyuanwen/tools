<template>
  <div @click="openProject"
       :style="{ display:'flex', padding: '8px',background: '#42b983',marginTop: '20px'}">
    <img :src="this.icon" width="32" height="32" :style="{marginRight:'10px'}"/>

    <div :style="{display:'flex',flexDirection:'column',flexGrow:1,alignItems:'flex-start'}">
      <div :style="{ color: 'red', fontSize:  '16px' }">{{ project.name || "项目名称" }}</div>
      <div>{{ project.path }}</div>
    </div>

    <IDESelect :onChange="selectIDE" :default-selected="project.openType"/>

    <el-button type="danger" @click.stop="deleteProject">删除</el-button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {ipcRenderer} from "electron";
import {Channel} from "../Constant";
import IDESelect from "./IDESelect";

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
    return {}
  },
  mounted() {
  },
  methods: {
    selectIDE(type) {
      ipcRenderer.send(Channel.OPEN_PROJECT, {
        type: type,
        path: this.project.path
      });
    },
    openProject() {
      ipcRenderer.send(Channel.OPEN_PROJECT, {
        type: "VSCode",
        path: this.project.path
      });
    },
    deleteProject() {
      ipcRenderer.send(Channel.DELETE_PROJECT, {
        path: this.project.path
      });
    }
  },
};
</script>

<style scoped>
</style>