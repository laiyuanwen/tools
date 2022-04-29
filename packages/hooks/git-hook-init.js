const path = require("path")
const fs = require('fs')
const os = require('os')
const { exit } = require("process")
const { execSync } = require("child_process")

/**
 * 查看和处理init.templatedir 
 */
function initGitTemplateDir() {
    const templatePath = readGitTemplateDir()
    if (!fs.existsSync(templatePath)) {
        fs.mkdirSync(path.join(templatePath))
    }

    const hooksPath = path.resolve(templatePath, "hooks")
    if (!fs.existsSync(hooksPath)) {
        fs.mkdirSync(hooksPath)
    }

    const preCommitPath = path.resolve(hooksPath, "pre-commit")
    console.log(`pre-commit path: ${preCommitPath}`);

    writePreCommitFile(preCommitPath)
    execSync(`chmod 755 ${preCommitPath}`)
}

function readGitTemplateDir() {
    const gitGlobalConfig = execSync("git config --global --list").toString()
    const result = /init.templatedir=(.*)/.exec(gitGlobalConfig)

    let templatePath
    if (result == null) {
        templatePath = path.resolve(process.env.HOME, ".git-templates")
        execSync(`git config --global init.templatedir '$${templatePath}'`)
    } else {
        templatePath = result[1]
    }

    if (templatePath.startsWith('~')) {
        templatePath = templatePath.replace(`~`, process.env.HOME)
    }
    return templatePath
}

function writePreCommitFile(path) {
    fs.writeFileSync(path, 'node "${TOOL_HOOKS_PATH}"' + os.EOL)
}

initGitTemplateDir()