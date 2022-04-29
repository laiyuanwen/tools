<template>
  <div @click="click" class="box">
    <div style="flex-grow: 1">
      <p class="name">
        {{ this.repo.name }}({{ this.repo.type }})
        <a-tag :color="status.color"> {{ status.text }}</a-tag>
      </p>
      <p class="git-address"> {{ this.repo.ssh }} </p>
    </div>

    <!-- 更多操作 -->
    <div style="align-items: center;display: flex">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.stop>
          <ellipsis-outlined style="font-size: 18px"/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="clone">
                <ellipsis-outlined/>
                Clone
              </a>
            </a-menu-item>
            <a-menu-item>
              <a @click="addToWorkspace">
                <ellipsis-outlined/>
                添加到工作区
              </a>
            </a-menu-item>
            <a-menu-item>
              <a @click="openHome">
                <home-outlined/>
                打开主页
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">
                <ellipsis-outlined/>
                删除</a></a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Repo } from "@/Constant";
import Icon from '@ant-design/icons-vue';
import { EllipsisOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { ipcRenderer, clipboard } from 'electron'
import { message } from "ant-design-vue";

export default {
  name: "GitComponent",
  components: { EllipsisOutlined, HomeOutlined, Icon },
  props: {
    // @ts-ignore
    repo: Repo
  },
  computed: {
    isCloning() {
      return this.$store.getters['repo/isCloning'](this.repo.ssh)
    },
    status() {
      if (this.isCloning) return { text: "Cloning", color: "orange" }
      else if (this.repo.inWorkspace) {
        const text = this.repo.isMBoxContainer ? "MBox主仓" : "已存在"
        return { text, color: 'green' }
      } else return { text: "不存在", color: "red" }
    }
  },
  data() {
    return {}
  },
  methods: {
    async clone() {
      if (this.repo.inWorkspace || this.isCloning) {
        return
      }
      this.$store.dispatch(`repo/clone`, this.repo.ssh)
    },
    openHome() {
      ipcRenderer.invoke('open-url', this.repo.home)
    },
    click() {
      clipboard.writeText(this.repo.ssh)
      message.success(`复制成功：${ this.repo.ssh }`)
    },
    addToWorkspace() {
      this.$store.dispatch(`project/addGitToProject`, this.repo.ssh)
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
  align-content: center;
  cursor: pointer;
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