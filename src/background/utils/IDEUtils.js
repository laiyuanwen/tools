import {exec} from 'child_process'

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


function openInAndroidStudio(path) {
    exec(`studio ${path}`);
}

function openInIntelliJIDEA(path) {
    exec(`idea ${path}`);
}

function openInVSCode(path) {
    exec(`code ${path}`);
}

function openInFinder(path) {
    exec(`open ${path}`);
}

function openInTerminal(path) {
    exec(`open -a iTerm ${path}`);
}