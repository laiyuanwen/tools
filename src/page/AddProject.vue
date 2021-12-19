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
import {Channel, OpenType, Tools} from "../Constant";
import {ipcRenderer} from "electron";
import {ProjectStore} from "@/utils/cache/ProjectStore";
import {ElMessage} from "element-plus";

export default defineComponent({
  components: {IDESelect},
  setup() {
    return {
      Tools,
      outerVisible: ref(false),
      name: ref(''),
      desc: ref(''),
      path: ref(''),
      openType: ref(OpenType.VSCode),
    }
  },
  methods: {
    ideChange(type) {
      this.openType = type
    },
    addProject() {
      const result = ProjectStore.addProject({
        name: this.name,
        desc: this.desc,
        path: this.path,
        openType: this.openType
      })
      if (result) {
        this.outerVisible = !this.outerVisible
        ElMessage.success('添加成功')
      } else {
        ElMessage.error('添加失败，路径已添加')
      }
    }
  }
})
</script>