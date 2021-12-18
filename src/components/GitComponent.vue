<template>
  <div @click="click" class="box">
    <div style="flex-grow: 1">
      <p class="name"> {{ this.git.name }}({{ this.git.type }}) </p>
      <p class="git-address"> {{ this.git.ssh }} </p>
    </div>
    <div>
      <el-button
          :style="[{color: git.inWorkspace ? '#67C23A':'#F56C6C'},this.git.inWorkspace && {pointerEvents: 'none'}]"
          :disabled="git.inWorkspace"
          :loading="cloning"
          @click.stop="clone"
          type="text">
        {{ status }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Git } from "@/Constant";
import { clone, currentBranch } from "@/utils";

export default {
  name: "GitComponent",
  props: {
    // @ts-ignore
    git: Git
  },
  computed: {
    status() {
      if (this.git.inWorkspace) return "已存在"
      else if (this.cloning) return "Cloning"
      else return "不存在"
    }
  },
  data() {
    return {
      cloning: false
    }
  },
  methods: {
    async clone() {
      this.cloning = true
      await clone(this.git.ssh)
      this.cloning = false
    },
    click() {
      console.log(this.git)
    }
  }
}
</script>

<style scoped>
.box {
  padding: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
}

.box:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.box:active {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
}

.box p {
  margin: 0;
}

.name {
  color: #303133;
}

.git-address {
  color: #909399;
  font-size: 12px;
}
</style>