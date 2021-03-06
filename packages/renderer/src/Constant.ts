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

export interface AdbRecentInputText {
    text: string
    time: number

    desc?: string
}

export interface Repo {
    name: string // 仓库名称
    ssh: string // git地址
    home: string // 仓库地址
    type: string // 仓库类型（公司、Github）
    inWorkspace: boolean // 是否在本地工作区间
    isMBoxContainer?: boolean // 是否为mbox主仓
    tags?: string[] // 分类
}

/**
 * 代码项目
 */
export interface Project {
    git: string // Git地址
    name: string // 项目名字

    path?: string // 项目地址
}

export interface ProjectOld {
    name: string // 项目名字
    desc: string // 项目描述
    icon?: string // 图标
    branch?: string // 当前分支
    openType: OpenType  // 最后一个打开的类型
    openTime?: number //  最后一次打开的时间
    path: string // 项目路径

    // 未来会支持的字段
    type?: string // 项目类型
    commitUser?: string // 提交人检查
    git?: string // Git地址
    source?: string // 项目来源（公司、Github等）
}

export enum OpenType {
    AndroidStudio = "AndroidStudio",
    IDEA = "IDEA",
    VSCode = "VSCode",
    Finder = "Finder",
    Terminal = "Terminal"
}