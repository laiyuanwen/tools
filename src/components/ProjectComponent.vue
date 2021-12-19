<template>
  <div @click="openProject"
       class="project">
    <img :src="this.icon" width="32" height="32" :style="{marginRight:'10px'}"/>

    <div :style="{display:'flex',flexDirection:'column',flexGrow:1,alignItems:'flex-start'}">
      <div class="name">
        {{ project.name || "项目名称" }}
        <el-tag size="small" effect="dark" type="danger">{{ this.branch }}</el-tag>
      </div>
      <div class="path">{{ project.path }}</div>
    </div>

    <div class="control">
      <IDESelect :onChange="selectIDE" :default-selected="project.openType"/>
      <div>
        <el-button type="primary" @click.stop="updateProject">修改</el-button>
        <el-button type="danger" @click.stop="deleteProject">删除</el-button>
      </div>
    </div>
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
    updateProject(){
      console.log("update project")
    },
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
.name {
  color: var(--el-text-color-primary)
}

.project {
  display: flex;
  padding: 8px;
  box-shadow: var(--el-box-shadow-base);
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: var(--el-border-radius-base);
}

.path {
  color: var(--el-color-info);
  font-size: 12px;
}

.project:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.project:active {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
}

.control {
  display: flex;
  flex-direction: column;
}
</style>