import { remote } from "electron";

export const PATH = remote.getGlobal('process').env.PATH
export const HOME = remote.getGlobal('process').env.HOME
