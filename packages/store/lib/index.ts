import Store from "electron-store";
import { HOME } from "@/utils/env";
import { AdbRecentInputText } from "../../renderer/src/Constant";

const adbCache = new Store({ name: 'adb', cwd: `${ HOME }/.tools/data` })


export function setStore() {

}

export function storeAdbInput() {
    console.log("保存输入内容");
}

export function getRecentInputText(): AdbRecentInputText[] {
    return adbCache.get("test", []) as AdbRecentInputText[]
}

export function saveRecentInputText(recentInputText: AdbRecentInputText[]) {
    adbCache.set("test", recentInputText)
}
