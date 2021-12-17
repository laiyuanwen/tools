import Store from 'electron-store'
import { Project, StoreKey } from "@/Constant";

const store = new Store()

/**
 * 获取项目列表
 */
export function getProjectList(): Project[] {
    return store.get(StoreKey.PROJECT_LIST, []) as Project[]
}

