import { createRouter, createWebHistory } from 'vue-router'
import WorkspacePage from '@/page/workspace/WorkspacePage.vue'
import ProjectListPage from "@/page/workspace/ProjectListPage.vue";

const routes = [
    { path: '/', component: WorkspacePage },
    { path: '/project', component: ProjectListPage },
]

// @ts-ignore
export default createRouter({
    // end: false,
    history: createWebHistory(),
    // sensitive: false,
    // strict: false,
    routes: routes
})