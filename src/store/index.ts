import { createStore } from 'vuex'
import { Project } from "@/Constant";
import { currentBranch } from "@/background/utils/git";
import { recordAsync } from "@/background/utils";
import { ProjectStore } from "@/background/utils/cache/ProjectStore";

interface State {
    projectList: Project[]
}

export const store = createStore({
    state(): State {
        return {
            projectList: ProjectStore.getProjectList()
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