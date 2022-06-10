import { createStore, Store } from 'vuex'
import { store as ProjectStore } from './modules/project/ProjectStore'

export interface RootState {
}

export const store: Store<RootState> = createStore({
    modules: {
        project: ProjectStore,
    },
    actions:{
        open(){
            console.log("open")
        }
    }
})