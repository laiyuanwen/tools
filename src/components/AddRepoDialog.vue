<template>
  <el-dialog
      ref="dialog"
      :model-value="show"
      @close="$emit('adlkfjakls',false)"
      title="添加仓库">
    <el-space direction="vertical" alignment="stretch" style="width: 100%">
      <el-input v-model="name" placeholder="名称"/>
      <el-input v-model="ssh" placeholder="ssh地址"/>
      <el-input v-model="home" placeholder="主页"/>
      <el-select style="width: 100%" v-model="type" placeholder="Select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </el-space>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="this.$refs.dialog.close()">取消</el-button>
        <el-button type="primary" @click="addRepo">添加</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script>
export default {
  name: "AddRepoDialog",
  props: {
    show: Boolean
  },
  data() {
    return {
      name: '',
      ssh: '',
      home: '',
      type: '',
      options: [
        {
          value: 'Github',
          label: 'Github',
        },
        {
          value: 'ByteDance',
          label: '字节跳动',
        },
        {
          value: 'other',
          label: '其他',
        }
      ]
    }
  },
  methods: {
    addRepo() {
      this.$store.dispatch('repo/addRepo', {
        name: this.name,
        ssh: this.ssh,
        home: this.home,
        type: this.type
      })
    }
  }
}
</script>

<style scoped>

</style>