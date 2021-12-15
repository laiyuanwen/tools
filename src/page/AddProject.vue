<template>
  <el-button type="primary" @click="outerVisible = true">添加项目</el-button>

  <el-dialog width="80%" v-model="outerVisible" title="添加项目">
    <el-space direction="vertical" style="width:100%" alignment="stretch">
      <el-input v-model="name" placeholder="项目名称"/>
      <el-input v-model="desc" placeholder="描述"/>
      <el-input v-model="path" placeholder="路径"/>
      <IDESelect :default-selected="Tools.VSCode" :onChange="ideChange"/>
    </el-space>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">取消</el-button>
        <el-button type="primary" @click="addProject">添加</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {defineComponent, ref} from 'vue'
import IDESelect from "../components/IDESelect";
import {Channel, Tools} from "../Constant";
import {ipcRenderer} from "electron";

export default defineComponent({
  components: {IDESelect},
  setup() {
    return {
      Tools,
      outerVisible: ref(true),
      name: ref(''),
      desc: ref(''),
      path: ref(''),
      openType: ref(''),
    }
  },
  methods: {
    ideChange(type) {
      this.openType = type
    },
    addProject() {
      this.outerVisible = !this.outerVisible
      // console.log(`path:${this.name}`)
      // console.log(`path:${this.desc}`)
      // console.log(`path:${this.path}`)
      // console.log(`path:${this.openType}`)
      ipcRenderer.send(Channel.ADD_PROJECT, {
        name: this.name,
        desc: this.desc,
        path: this.path,
        openType: this.openType
      })
    }
  }
})
</script>