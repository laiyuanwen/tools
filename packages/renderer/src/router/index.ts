import { createRouter, createWebHistory } from 'vue-router'
import WorkspacePage from '@/page/workspace/WorkspacePage.vue'
import ProjectListPageOld from "@/page/workspace/ProjectListPage.vue";
import ProjectListPage from "@/page/ProjectList/ProjectListPage";
import ToolsPage from "@/page/tools/ToolsPage.vue";

const routes = [
    { path: '/', component: ToolsPage },
    { path: '/workspace', component: WorkspacePage },
    { path: '/project', component: ProjectListPage },
    { path: '/repo', component: ProjectListPageOld },
    { path: '/tools', component: ProjectListPageOld },
    { path: '/settings', component: ProjectListPageOld },
]

// @ts-ignore
export default createRouter({
    // end: false,
    history: createWebHistory(),
    // sensitive: false,
    // strict: false,
    routes: routes
})