export interface Config {
    scanning: ScanningConfig,
    commitUser: CommitUser
}

export interface ScanningConfig {
    // 扫描关键词
    keywords: Array<String>

    // 不扫描的仓库
    ignoreRepos: Array<String>

    // 不扫描的路径
    ignorePaths: Array<String>
}

export interface CommitUser {
    // 默认的用户
    defalut?: {
        user: String,
        email: String
    },

    // 特定域名的用户
    [key: string]: {
        user: String,
        email: String
    } | undefined
}