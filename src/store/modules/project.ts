import { Project } from "@/Constant";
import { ProjectStore } from "@/utils/cache/ProjectStore";
import * as fs from "fs";
import { currentBranch } from "@/utils";
import { WORKSPACE } from "@/utils/env";
import { RepoStore } from "@/utils/cache/RepoStore";
import { message } from "ant-design-vue";

interface State {
    projectList: Project[]
}

const state = () => {
    return {
        projectList: ProjectStore.getProjectList()
    } as State
}

// getters
const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     console.log()
    // },
    //
    // cartTotalPrice: (state, getters) => {
    //     console.log()
    // }
}

// actions
const actions = {
    async addGitToProject({ state, commit }, git) {
        const repo = RepoStore.getRepo(git)
        const repoName = /(?<=\/)[^/]+(?=\.git)/.exec(repo.ssh)[0]

        const workspacePath = `${ WORKSPACE }/${ repoName }`;

        if (!fs.existsSync(workspacePath)) {
            message.error("路径不存在，先Clone仓库吧")
            return
        }

        const branch = await currentBranch(workspacePath)
        ProjectStore.addProject({
            name: repo.name,
            desc: repo.name,
            branch,
            path: workspacePath,
            openType: this.openType
        })

    },

    syncCodeDir({ state, commit }) {
        // record(()=>{
        //     const dirs = fs.readdirSync(`${HOME}/code`)
        //     for (const dir of dirs) {
        //         console.log("文件夹:" + dir)
        //     }
        // })
    }
}


// mutations
const mutations = {
    // pushProductToCart(state, { id }) {
    //     console.log()
    // },
    //
    // incrementItemQuantity(state, { id }) {
    //     console.log()
    // },
    //
    // setCartItems(state, { items }) {
    //     console.log()
    // },
    //
    // setCheckoutStatus(state, status) {
    //     console.log()
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}