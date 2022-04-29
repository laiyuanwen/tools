import { createStore } from 'vuex'
import { Project } from "@/Constant";
import { currentBranch } from "@/utils/git";
import { ProjectStore } from "@/utils/cache/ProjectStore";
import project from './modules/project'
import repo from './modules/repo'

interface State {
    projectList: Project[]
}

export const store = createStore({
    modules: {
        project,
        repo
    },
    state(): State {
        return {
            projectList: ProjectStore.getProjectList()
        }
    },
    mutations: {
        update(state: State, projectList) {
            state.projectList = projectList
        }
    },
    actions: {
        async onfocus({ commit, state }) {
            const promise = [] as Promise<Project>[]

            for (const project of state.projectList) {
                promise.push(currentBranch(project.path)
                    .then(branch => ({ ...project, branch })))
            }

            const list = await Promise.all(promise)
            commit('update', list)
        }
    }
})