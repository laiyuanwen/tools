import {app, ipcMain} from 'electron'
import {openProject} from "./utils/IDEUtils";
import {Channel, StoreKey} from "../Constant";
import {getProjectList, updateProjectOnOpen} from "./utils/Store";

const console = require('console');
app.console = new console.Console(process.stdout, process.stderr);

/**
 * 打开项目
 */
ipcMain.on(Channel.OPEN_PROJECT, (_, {type, path}) => {
    app.console.log(`打开项目：${type} ${path}`)
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
    // TODO 解除监听
    app.store.onDidChange(StoreKey.PROJECT_LIST, ((newValue, oldValue) => {
        app.console.log("监听到projectList改变")
        app.console.log(JSON.stringify(newValue))
        win.webContents.send(Channel.PROJECT_CHANNEL, newValue)
    }))
}
