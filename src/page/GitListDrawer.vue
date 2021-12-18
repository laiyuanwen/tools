<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    Git列表
  </el-button>
  <el-drawer
      @open="onOpenDrawer"
      v-model="drawer"
      size="40%"
      title="Git列表">
    <div class="drawer-container">
      <el-space direction="vertical" alignment="stretch" class="git-list">
        <GitComponent v-for="(git,index) in repos" :key="git.ssh" :repo="git"/>
      </el-space>
      <el-button style="border-radius: 0" :round="false" type="primary">添加</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GitComponent from "../components/GitComponent.vue";
import { useStore } from 'vuex'

export default defineComponent({
  components: { GitComponent },
  setup() {
    return {
      drawer: ref(true)
    }
  },
  mounted() {
    this.$store.dispatch("repo/syncRepoList")
  },
  computed: {
    repos: function () {
      return this.$store.state.repo.repos
    }
  },
  methods: {
    onOpenDrawer() {
      this.$store.dispatch("repo/syncRepoList")
    }
  }
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