import { Project } from "@/Constant";
import { getProjectList } from "@/store/modules/project/ProjectCache";
import { Module } from "vuex";
import { RootState } from "@/store";
import { IDE } from "@/utils";

export interface State {
    projectList: Project[]
}

export enum ProjectActionType {
    OPEN_PROJECT = "project/openProject"
}

const state = (): State => {
    return {
        projectList: getProjectList()
    }
}

const getters = {}
const mutations = {}

const actions = {
    openProject({ commit, state }, project: Project) {
        IDE.openInTerminal(project.path)

        console.log("openProject", project)
    }
}

export const store: Module<State, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}