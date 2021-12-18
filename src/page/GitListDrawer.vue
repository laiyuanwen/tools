<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    Git列表
  </el-button>
  <el-drawer
      v-model="drawer"
      size="40%"
      title="Git列表">
    <div class="drawer-container">
      <el-space direction="vertical" alignment="stretch" class="git-list">
        <GitComponent v-for="(git,index) in gitList" :key="git.ssh" :git="git"/>
      </el-space>
      <el-button style="border-radius: 0" :round="false" type="primary">添加</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import GitComponent from "../components/GitComponent.vue";
import { Git } from "@/Constant";

export default defineComponent({
  components: { GitComponent },
  setup() {
    const drawer = ref(true)
    return {
      gitList: [
        {
          name: '仓库',
          home: "https://www.baidu.com/",
          ssh: "git@github.com:electron/electron-quick-start.git",
          type: "github",
          inWorkspace: false
        },
        {
          name: '仓库',
          home: "https://www.baidu.com/",
          ssh: "git@github.com:desktop/desktop.git",
          type: "github",
          inWorkspace: true
        }
      ] as Git[],
      drawer,
    }
  },
})
</script>

<style scoped>
.drawer-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.git-list {
  flex-grow: 1;
  padding-left: 8px;
  padding-right: 8px;
}
</style>