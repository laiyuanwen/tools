const path = require("path")
const fs = require('fs')
const os = require('os')
const { exit } = require("process")
const { execSync } = require("child_process")
const _ = require("lodash")

const CONFIG_PATH = path.join(process.env.HOME, ".tools/config/git-config.json")

module.exports = {

    /**
     * 读取.gitignore的内容 
     */
    readGitIgnore(projectPath) {
        let ignorePath = path.resolve(projectPath, ".gitignore");

        if(!fs.existsSync(ignorePath)){
            return []
        }

        const content = fs.readFileSync(ignorePath).toString()

        return _.chain(content.split("\n"))
            .compact(content)
            .filter((c) => !c.startsWith("#"))
            .value()
    },

    /**
     * 读取配置内容 
     */
    readScanningConfig() {

        if (!fs.existsSync(CONFIG_PATH)) {
            console.log("不存在配置文件，不启动扫描");
            exit(0)
        }

        const config = JSON.parse(
            fs.readFileSync(CONFIG_PATH).toString()
        ).scanning

        return {
            // 扫描关键词
            keywords: config.keywords,

            // 不扫描的仓库
            ignoreRepos: config.ignoreRepos,

            // 不扫描的路径
            ignorePaths: config.ignorePaths,
        }
    }

}
