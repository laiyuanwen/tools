<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    Git列表
  </el-button>
  <a-drawer
      @after-visible-change="onOpenDrawer"
      v-model:visible="drawer"
      :bodyStyle="{padding:0}"
      width="400"
      title="Git列表">
    <div class="drawer-container">
      <a-space direction="vertical" class="git-list">
        <GitComponent v-for="git in repos" :key="git.ssh" :repo="git"/>
      </a-space>
      <a-button @click="dialog=true" type="primary">添加</a-button>
    </div>
  </a-drawer>
  <AddRepoDialog v-model="dialog"/>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import GitComponent from "../components/GitComponent.vue";
import { useStore } from 'vuex'
import AddRepoDialog from "@/components/AddRepoDialog.vue";

export default defineComponent({
  components: { AddRepoDialog, GitComponent },
  setup() {
    return {
      size: 400,
      dialog: ref(false),
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
  justify-content: space-between;
}

.git-list {
  overflow: scroll;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>