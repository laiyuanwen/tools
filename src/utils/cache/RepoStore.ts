import Store from "electron-store";
import { Repo } from "@/Constant";
import { HOME } from "@/utils/env";

const store = new Store({
    name: 'repo',
    cwd: `${ HOME }/.tools`
})

export enum StoreKey {
    REPO_LIST = "REPO_LIST"
}

export const RepoStore = {

    /**
     * 监听项目的变化
     */
    addListener(callback) {
        store.onDidChange(StoreKey.REPO_LIST, (newValue, oldValue) => {
            callback(newValue, oldValue)
        })
    },

    /**
     * 获取项目列表
     */
    getRepoList(): Repo[] {
        const newVar = store.get(StoreKey.REPO_LIST, []);
        return newVar as Repo[]
    }
}