import { Repo } from "@/Constant";
import { RepoStore } from "@/utils/cache/RepoStore";
import _ from 'lodash'
import { clone, getGitUrl } from "@/utils";
import fs from "fs";
import { WORKSPACE } from "@/utils/env";

interface State {
    repos: Repo[]
    cloningRepo: string[]
    selectTags: string[]
}

const state = () => {
    return {
        repos: [],
        cloningRepo: [],
        selectTags: [],
    } as State
}

const getters = {
    /**
     * 仓库是否正在cloning
     */
    isCloning: (state: State, getters, rootState) => (ssh) => {
        return _.includes(state.cloningRepo, ssh);
    },

    /**
     * 获取仓库的分类
     */
    allTags: (state: State) => {
        return _.chain(state.repos)
            .map("tags")
            .flatten()
            .compact()
            .uniq()
            .value()
    },

    /**
     * 获取选中的仓库
     */
    selectTagsRepos(state: State) {
        if (_.isEmpty(state.selectTags)) {
            return state.repos
        }
        return _.filter(state.repos, (repo: Repo) => {
            if (!repo.tags) return false
            for (const tag of repo.tags) {
                if (_.includes(state.selectTags, tag))
                    return true
            }
            return false
        })
    }
}

const actions = {
    async syncRepoList({ commit }) {
        const repos = RepoStore.getRepos()
        const workspace = fs.readdirSync(WORKSPACE)

        console.log("workspace文件夹：")
        console.log(workspace)

        const gitUrls = await Promise.all(workspace
            .filter(dir => fs.existsSync(`${ WORKSPACE }/${ dir }/.git`))
            .map(dir => getGitUrl(`${ WORKSPACE }/${ dir }`)))

        // 读取每个git仓库的ssh
        for (const repo of repos) {
            repo.inWorkspace = _.includes(gitUrls, repo.ssh)
        }
        commit("setRepos", repos)
    },
    async clone({ commit, state }, ssh) {
        commit("startClone", ssh)
        await clone(ssh)
        commit("cloneFinish", ssh)
    },
    async addRepo({ commit, dispatch }, repo: Repo) {
        RepoStore.addRepo(repo)
        dispatch('syncRepoList')
    }
}

const mutations = {
    setRepos(state: State, repos) {
        state.repos = repos
    },
    startClone(state: State, ssh) {
        state.cloningRepo.push(ssh)
    },
    cloneFinish(state: State, ssh) {
        state.cloningRepo = state.cloningRepo.filter(s => ssh !== s)
        // @ts-ignore
        _.find(state.repos, { ssh }).inWorkspace = true
    },
    updateSelectTags(state: State, tags) {
        state.selectTags = tags
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}