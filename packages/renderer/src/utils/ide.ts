import { exec } from 'child_process'
import { PATH } from "@/utils/env";

export function openProject(type, path) {
    if (type === "AndroidStudio") {
        openInAndroidStudio(path)
    } else if (type === "IDEA") {
        openInIntelliJIDEA(path)
    } else if (type === "VSCode") {
        openInVSCode(path)
    } else if (type === "Finder") {
        openInFinder(path)
    } else if (type === "Terminal") {
        openInTerminal(path)
    }
}

const options = { env: { PATH: `/usr/local/bin:${ PATH }` } }

function openInAndroidStudio(path) {
    exec(`studio ${ path }`, options);
}

function openInIntelliJIDEA(path) {
    exec(`idea ${ path }`, options);
}

function openInVSCode(path) {
    exec(`code ${ path }`, options);
}

function openInFinder(path) {
    exec(`open ${ path }`, options);
}

function openInTerminal(path) {
    exec(`open -a iTerm ${ path }`, options);
}