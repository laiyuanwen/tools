import { createStore } from 'vuex'

interface State {
    count: number
}

export const store = createStore({
    state() {
        return {
            count: 100
        }
    },
    mutations: {
        increment(state: State) {
            state.count++
        }
    },
    actions: {
        onfocus({commit}) {
            console.log("onfocus")
            commit('increment')
        }
    }
})