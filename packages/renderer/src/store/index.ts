import { createStore, Store } from 'vuex'
import { store as ProjectStore } from './modules/project/ProjectStore'
import { store as ADBStore } from './modules/adb/AdbStore'

export interface RootState {
}

export const store: Store<RootState> = createStore({
    modules: {
        project: ProjectStore,
        adb: ADBStore,
    },
    actions: {}
})