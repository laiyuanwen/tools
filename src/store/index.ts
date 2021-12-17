import { createStore } from 'vuex'
import { Project } from "@/Constant";
import { getProjectList } from "@/background/utils/cache";
import { currentBranch } from "@/background/utils/git";
import { recordAsync } from "@/background/utils";

interface State {
    projectList: Project[]
}

export const store = createStore({
    state(): State {
        return {
            projectList: getProjectList()
        }
    },
    mutations: {
        update(state: State, projectList) {
            console.log("new project list" + JSON.stringify(projectList))
            state.projectList = projectList
        }
    },
    actions: {
        async onfocus({commit, state}) {
            const promise = [] as Promise<Project>[]

            for (const project of state.projectList) {
                promise.push(currentBranch(project.path)
                    .then(branch => ({...project, branch})))
            }

            await recordAsync(async () => {
                const list = await Promise.all(promise)
                commit('update', list)
            })
        }
    }
})