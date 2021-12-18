import { Project } from "@/Constant";
import { ProjectStore } from "@/utils/cache/ProjectStore";
import * as fs from "fs";
import { record } from "@/utils";
import { HOME } from "@/utils/env";

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
    // async checkout({ commit, state }, products) {
    //     console.log()
    // },
    //
    // addProductToCart({ state, commit }, product) {
    //     console.log()
    // },

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