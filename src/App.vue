<template>
  <ProjectListPage msg="Welcome to Your Vue.js App Electron"/>
</template>

<script>
import ProjectListPage from './page/ProjectListPage.vue'
import {StoreKey} from "./Constant";
import Store from "electron-store";

const {execSync} = require('child_process')
const branch = execSync('git symbolic-ref --short HEAD')
console.log(" branch = " + branch.toString().trim() + " end ")

const store = new Store({name: 'project'})
store.set(StoreKey.PROJECT_LIST,[{name:123}])
console.log(
    store.get(StoreKey.PROJECT_LIST) || []
)
store.set(StoreKey.PROJECT_LIST,[])


export default {
  name: 'App',
  components: {
    ProjectListPage
  }
}
</script>
