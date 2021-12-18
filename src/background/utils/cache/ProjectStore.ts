import Store from "electron-store";
import { OpenType, Project } from "@/Constant";
import _ from "lodash";
import { HOME } from "@/background/utils/env";

const store = new Store({
    name: 'project',
    cwd: `${ HOME }/.tools`
})

export enum StoreKey {
    PROJECT_LIST = "PROJECT_LIST"
}

export const ProjectStore = {

    /**
     * 监听项目的变化
     */
    addListener(callback) {
        store.onDidChange(StoreKey.PROJECT_LIST, (newValue, oldValue) => {
            callback(newValue, oldValue)
        })
    },

    /**
     * 获取项目列表
     */
    getProjectList(): Project[] {
        const newVar = store.get(StoreKey.PROJECT_LIST, []);
        console.log(store)
        console.log(newVar)
        return newVar as Project[]
    },

    /**
     * 添加项目
     *
     * @return 是否添加成功
     */
    addProject(project: Project): boolean {
        const { path } = project
        const projects = this.getProjectList()

        const currentProject = _.find(projects, { path })

        if (currentProject) {
            return false
        }

        projects.push({
            ...project,
            openTime: new Date().getTime(),
        })

        setProject(projects)
        return true
    },

    /**
     * 删除项目
     */
    deleteProject(path: string) {
        const projects = this.getProjectList()
        _.remove(projects, { path });
        setProject(projects)
    },

    /**
     * 更新项目
     */
    updateProjectOnOpen(type: OpenType, path: string): boolean {
        const projects = this.getProjectList()

        const currentProject = _.find(projects, { path })

        if (!currentProject) {
            return false
        }

        currentProject.openTime = new Date().getTime()
        currentProject.openType = type

        setProject(projects)
        return true
    }
}

function setProject(projects: Project[]) {
    const value = _.orderBy(projects, ['openTime'], ['desc']);
    store.set(StoreKey.PROJECT_LIST, value)
    console.log(value)
    console.log("写入成功")
}