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

const options = { env: { PATH: PATH } }
const callback = (error, stdout, stderr) => {
    console.log(options)
    console.log(error)
    console.log(stdout)
    console.log(stderr)
}

function openInAndroidStudio(path) {
    exec(`studio ${ path }`, options, callback);
}

function openInIntelliJIDEA(path) {
    exec(`idea ${ path }`, options, callback);
}

function openInVSCode(path) {
    exec(`code ${ path }`, options, callback);
}

function openInFinder(path) {
    exec(`open ${ path }`, options, callback);
}

function openInTerminal(path) {
    exec(`open -a iTerm ${ path }`, options, callback);
}