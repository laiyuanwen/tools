const path = require("path")
const { exit } = require("process")
const { execSync } = require("child_process")
const _ = require("lodash")
const { readGitIgnore, readScanningConfig } = require("./utils")

function getFindCmd(path, skipPaths, keywords) {
    let cmd = `find ${path} \\( `

    // 添加忽略的路径
    cmd += `-path "${skipPaths[0]}" `
    for (let i = 1; i < skipPaths.length; i++) {
        cmd += `-or -path "${skipPaths[i]}" `
    }

    cmd += `\\) -prune -or -type f -print | xargs grep -E -i `

    // 添加搜索的关键词
    cmd += `"${keywords[0]}`
    for (let i = 1; i < keywords.length; i++) {
        cmd += `|${keywords[i]}`
    }
    cmd += `"`

    return cmd
}

function getIgnorePaths(projectPath, configPaths, ignorePath) {

    ignorePath = _.map(ignorePath, (path) => {
        let res
        if (path.startsWith("./")) res = path
        else if (path.startsWith("/")) res = "." + path
        else res = "./" + path

        if (res.endsWith("/")) res = res.substring(0, res.length - 1)

        return res
    })

    ignorePath = _.concat(configPaths, ignorePath)

    return _.map(ignorePath, (p) => {
        return path.resolve(projectPath, p)
    })
}

function isIgnoreRepo(ignoreRepos) {
    const output = execSync("git remote -v").toString().trim()
    if (_.isEmpty(output)) {
        return false
    }

    const matchResult = /git@(.*):.*.git/.exec(output)
    if (matchResult == null) {
        return false
    }
    const repoHost = matchResult[1]
    return _.includes(ignoreRepos, repoHost)
}

function main() {
    const projectPath = execSync("git rev-parse --show-toplevel").toString().trim()
    const config = readScanningConfig()

    // 是否需要搜索当前仓库
    if (isIgnoreRepo(config.ignoreRepos)) {
        console.log("不检查当前仓库");
        return
    }

    const ignoreContent = readGitIgnore(projectPath)
    const ignorePaths = getIgnorePaths(projectPath, config.ignorePaths, ignoreContent)
    const cmd = getFindCmd(projectPath, ignorePaths, config.keywords)

    try {
        const matchResult = execSync(cmd).toString();
        console.log("搜索命令：", cmd);
        console.log(matchResult);
        exit(1)
    } catch (error) {
        console.log("搜索完成，无不合法字符");
    }
}

main()


