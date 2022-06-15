import { AdbRecentInputText, Project } from "@/Constant";
import { getProjectList } from "@/store/modules/project/ProjectCache";
import { Module } from "vuex";
import { RootState } from "@/store";
import { IDE } from "@/utils";
import { ADB } from "../../../../../utils/lib";
import * as Store from "../../../../../store/lib";
import * as _ from 'lodash'

export interface State {
    selectedDevice: string // 当前选择的设备
    devices: string[] // 当期连接的设备
    recentInputText: AdbRecentInputText[]
}

export enum ToolsActionType {
    ADB_TEXT_INPUT = "adb/adbTextInput"
}

const state = (): State => {

    const devices = ADB.getDeviceList()

    // TODO 对设备列表添加轮训
    // TODO 默认选中的是上次选中的设备
    return {
        devices,
        selectedDevice: devices[0],
        recentInputText: Store.getRecentInputText()
    }
}

const getters = {}

const mutations = {
    updateRecentText(state: State, text: string) {
        const removeIndex = state.recentInputText.findIndex((i) => i.text === text)
        if (removeIndex != -1) {
            state.recentInputText.splice(removeIndex, 1)
        }
        state.recentInputText.unshift({ text, time: new Date().getTime() })
        console.log(state.recentInputText);

        Store.saveRecentInputText(state.recentInputText)
    }
}

const actions = {
    adbTextInput: ({ commit, state }, text: string) => {
        ADB.inputText(state.selectedDevice, text)
        commit("updateRecentText", text)
    }
}

export const store: Module<State, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}