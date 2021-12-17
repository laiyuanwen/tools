export const Channel = {
    PROJECT_CHANNEL: "PROJECT_CHANNEL",
    OPEN_PROJECT: "OPEN_PROJECT",
    ADD_PROJECT: "ADD_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",
    GET_PROJECT_LIST: "GET_PROJECT_LIST"
}

export enum StoreKey {
    PROJECT_LIST = "PROJECT_LIST"
}

export const Tools = {
    AndroidStudio: "AndroidStudio",
    IDEA: "IDEA",
    VSCode: "VSCode",
    Finder: "Finder",
    Terminal: "Terminal"
}

export interface Project {
    name: string // 项目名字
    desc: string // 项目描述
    icon: string // 图标
    branch: string // 当前分支
    openType: string  // 最后一个打开的类型
    openTime: string //  最后一次打开的时间
    path: string // 项目路径
}