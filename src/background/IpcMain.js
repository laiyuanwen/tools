import {app, ipcMain} from 'electron'
import {openProject} from "./utils/IDEUtils";
import {Channel, StoreKey} from "../Constant";
import {getProjectList, updateProjectOnOpen} from "./utils/Store";

/**
 * 打开项目
 */
ipcMain.on(Channel.OPEN_PROJECT, (_, {type, path}) => {
    console.log(`打开项目：${type} ${path}`)
    updateProjectOnOpen(type, path)
    openProject(type, path)
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
    win.on('close',()=>{
        unsubscribe()
    })
}
