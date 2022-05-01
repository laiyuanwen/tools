import { createRouter, createWebHistory } from 'vue-router'
import WorkspacePage from '@/page/workspace/WorkspacePage.vue'
import ProjectListPage from "@/page/workspace/ProjectListPage.vue";
import ToolsPage from "@/page/tools/ToolsPage.vue";

const routes = [
    { path: '/', component: ToolsPage },
    { path: '/workspace', component: WorkspacePage },
    { path: '/project', component: ProjectListPage },
    { path: '/repo', component: ProjectListPage },
    { path: '/tools', component: ProjectListPage },
    { path: '/settings', component: ProjectListPage },
]

// @ts-ignore
export default createRouter({
    // end: false,
    history: createWebHistory(),
    // sensitive: false,
    // strict: false,
    routes: routes
})