import { Repo } from "@/Constant";
import { RepoStore } from "@/utils/cache/RepoStore";
import _ from 'lodash'
import { clone, getGitUrl } from "@/utils";
import fs from "fs";
import { HOME, WORKSPACE } from "@/utils/env";

interface State {
    repos: Repo[]
    cloningRepo: string[]
}

const state = () => {
    return {
        repos: [],
        cloningRepo: []
    } as State
}

const getters = {
    /**
     * 仓库是否正在cloning
     */
    isCloning: (state: State, getters, rootState) => (ssh) => {
        return _.includes(state.cloningRepo, ssh);
    },
}

const actions = {
    async syncRepoList({ commit }) {
        const repos = RepoStore.getRepoList()
        const workspace = fs.readdirSync(WORKSPACE)

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
        _.find(state.repos, { ssh }).inWorkspace = true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}