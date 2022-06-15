import Store from "electron-store";
import { Project, StoreKey } from "@/Constant";
import { HOME } from "@/utils/env";

const cache = new Store({ name: 'project', cwd: `${ HOME }/.tools` })

export function getProjectList(): Project[] {
    return cache.get(StoreKey.PROJECT_LIST, []) as Project[]
}