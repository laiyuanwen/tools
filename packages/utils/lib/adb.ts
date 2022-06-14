import { execSync } from "child_process";

/**
 * 获取设备
 */
export function getDeviceList(): string[] {
    const content = execSync("adb devices").toString()
    const devices = [] as string[]

    const reg = /(.*)\t(.*)/g
    while (true) {
        const result = reg.exec(content)
        if (result == null) break
        else devices.push(result[1])
    }

    return devices
}

/**
 * 输入文字（adb不支持Unicode编码）
 */
export function inputText(device: string, text: string) {
    const cmd = `adb -s ${device} shell input text ${text}`
    try {
        execSync(cmd)
    } catch (error) {
        console.error("adb input输入异常", cmd);
    }
}

/**
 * 获取顶层Activity类名
 */
export function getTopActivity(){

}

/**
 * 获取Activity栈
 */
export function getActivityStack():string{
    return ""
}


