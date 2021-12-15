<template>
  <div @click="openProject"
       :style="{ display:'flex', padding: '16px',background: '#42b983',marginTop: '20px'}">
    <img :src="this.icon" width="32" height="32" :style="{marginRight:'10px'}"/>

    <div :style="{display:'flex',flexDirection:'column',flexGrow:1,alignItems:'flex-start'}">
      <div :style="{ color: 'red', fontSize:  '16px' }">{{ project.name || "项目名称" }}</div>
      <div>{{ project.path }}</div>
    </div>

    <div>{{ project.openType }}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {ipcRenderer} from "electron";
import {Channel} from "../Constant";

export default {
  name: "Project",
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
    openProject() {
      ipcRenderer.send(Channel.OPEN_PROJECT, {
        type: "VSCode",
        path: this.project.path
      });
    },
  },
};
</script>

<style scoped>
</style>