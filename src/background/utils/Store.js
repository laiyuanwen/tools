import {app} from 'electron'
import Store from 'electron-store'
import _ from 'lodash'
import {StoreKey} from "../../Constant";

const store = new Store()
app.store = store

/**
 * 打开项目的时候，更新最新打开的时间和打开类型
 */
export function updateProjectOnOpen(type, path) {
    const projects = store.get(StoreKey.PROJECT_LIST) || []

    const currentProject = _.find(projects, {path})

    if (currentProject) {
        currentProject.openTime = new Date().getTime()
        currentProject.openType = type
    } else {
        projects.push({openType: type, openTime: new Date().getTime(), path})
    }

    store.set(StoreKey.PROJECT_LIST,  _.orderBy(projects, ['openTime'], ['desc']))
}

export function getProjectList() {
    return store.get(StoreKey.PROJECT_LIST)
}

export function addProject() {

}