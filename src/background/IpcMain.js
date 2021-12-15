import {app, ipcMain} from 'electron'
import {openProject} from "./utils/IDEUtils";
import {Channel, StoreKey} from "../Constant";
import {addProject, deleteProject, getProjectList, updateProjectOnOpen} from "./utils/Store";

/**
 * 打开项目
 */
ipcMain.on(Channel.OPEN_PROJECT, (_, {type, path}) => {
    console.log(`打开项目：${type} ${path}`)
    updateProjectOnOpen(type, path)
    openProject(type, path)
})

/**
 * 添加项目
 */
ipcMain.on(Channel.ADD_PROJECT, (_, {name, desc, path, openType}) => {
    console.log(`添加项目：${name}, ${desc}, ${path}, ${openType}`)
    addProject(name, desc, path, openType)
})

/**
 * 删除项目
 */
ipcMain.on(Channel.DELETE_PROJECT, (_, {path}) => {
    console.log(`删除项目：${path}`)
    deleteProject(path)
})

/**
 * 获取项目
 */
ipcMain.handle(Channel.GET_PROJECT_LIST, () => {
    return getProjectList()
})

export function onWindowCreate(win) {
    const unsubscribe = app.store.onDidChange(StoreKey.PROJECT_LIST, ((newValue, oldValue) => {
        console.log("监听到projectList改变")
        console.log(JSON.stringify(newValue))
        win.webContents.send(Channel.PROJECT_CHANNEL, newValue)
    }))
    win.on('close', () => {
        unsubscribe()
    })
}
