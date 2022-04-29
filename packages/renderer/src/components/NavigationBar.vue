<template>
  <div class="navigation-container">
    <div style="height: 70px;">头像</div>
    <div class="nav-item" v-for="item in navs" :key="item.name">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data: function () {
    return {
      
      navs: [
        {name: "工作台"}, // 干活的地方
        {name: "项目"}, // 管理多个项目的地方
        {name: "工具"}, // 各种工具集合
        {name: "设置"}, // 设置
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.navigation-container {
  padding-top: 100px;
  background: #3a8ee6;
  width: 70px;
  height: 100%;
  -webkit-app-region: drag
}

.nav-item {
  height: 70px;
  margin-bottom: 10px;
  cursor: pointer
}

.nav-item:hover {
  background: #42b983;
}

</style>