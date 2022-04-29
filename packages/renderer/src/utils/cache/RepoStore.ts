import { Repo } from "@/Constant";
import { HOME } from "@/utils/env";
import _ from "lodash"

const store = {} as any
// new Store({
//     name: 'repo',
//     cwd: `${ HOME }/.tools`
// })

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

    getRepo(ssh: string): Repo {
        const repos = this.getRepos()
        return _.find(repos, { ssh }) as Repo
    },

    addRepo(repo: Repo) {
        const repos = this.getRepos()
        repos.unshift(repo)
        store.set(StoreKey.REPO_LIST, repos)
    },

    /**
     * 获取项目列表
     */
    getRepos(): Repo[] {
        return (store.get(StoreKey.REPO_LIST, [])) as Repo[]
    }
}