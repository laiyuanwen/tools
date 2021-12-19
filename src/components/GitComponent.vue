<template>
  <div @click="click" class="box">
    <div style="flex-grow: 1">
      <p class="name"> {{ this.repo.name }}({{ this.repo.type }}) </p>
      <p class="git-address"> {{ this.repo.ssh }} </p>
    </div>
    <div>
      <el-button
          :style="[{color: repo.inWorkspace ? '#67C23A':'#F56C6C'},this.repo.inWorkspace && {pointerEvents: 'none'}]"
          :disabled="repo.inWorkspace"
          :loading="this.isCloning"
          @click.stop="clone"
          type="text">
        {{ status }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Repo } from "@/Constant";
import { clone } from "@/utils";

export default {
  name: "GitComponent",
  props: {
    // @ts-ignore
    repo: Repo
  },
  computed: {
    isCloning() {
      return this.$store.getters['repo/isCloning'](this.repo.ssh)
    },
    status() {
      if (this.isCloning) return "Cloning"
      else if (this.repo.inWorkspace) return "已存在"
      else return "不存在"
    }
  },
  data() {
    return {}
  },
  methods: {
    async clone() {
      this.$store.dispatch(`repo/clone`, this.repo.ssh)
    },
    click() {
      // this.cloning = false
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
  color: var(--el-text-color-primary);
}

.git-address {
  color: var(--el-color-info);
  font-size: 12px;
}
</style>