import { execSync } from "child_process";
import fs from 'fs'
import path from 'path'
import { Config, ScanningConfig, CommitUser } from "./types";

const CONFIG_PATH = path.join(process.env['HOME'] || "", ".tools")
const CONFIG_NAME = "config.json"
const defaultConfig: Config = {
    scanning: {
        keywords: [],
        ignorePaths: [],
        ignoreRepos: []
    },
    commitUser: {}
}

function readConfig(): Config {
    const configPath = path.resolve(CONFIG_PATH, CONFIG_NAME)

    if (!fs.existsSync(configPath)) {
        initConfig()
    }
    return JSON.parse(fs.readFileSync(configPath).toString())
}

function writeConfig(config: Config) {
    const configPath = path.resolve(CONFIG_PATH, CONFIG_NAME)
    fs.writeFileSync(configPath, JSON.stringify(config, null, '\t'))
}

function initConfig() {
    const configPath = path.resolve(CONFIG_PATH, CONFIG_NAME)

    if (fs.existsSync(configPath)) {
        return
    }
    if (!fs.existsSync(CONFIG_PATH)) {
        fs.mkdirSync(CONFIG_PATH)
    }
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, '\t'))
}

/**
 * 读取Hook扫描的配置
 */
export function readScanningConfig(): ScanningConfig {
    return readConfig()?.scanning
}

/**
 * 读取Git提交用户的配置 
 */
export function readCommitUserConfig(): CommitUser {
    return readConfig()?.commitUser
}

export function updateCommitUserConfig(commitUser: CommitUser) {
    const config = readConfig()

    config.commitUser = commitUser

    writeConfig(config)
}
