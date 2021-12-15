import {exec} from 'child_process'
const log = require('electron-log');

export function openProject(type, path) {
    const file =  log.transports.file.getFile();
    log.info(file)
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
    exec(`code ${path}`,{env: { PATH: `/usr/local/bin:${process.env['PATH']}` }},(error, stdout, stderr) => {
        log.info("openInVSCode " + error)
        log.info("openInVSCode " + stdout)
        log.info("openInVSCode " + stderr)
    });
}

function openInFinder(path) {
    exec(`open ${path}`);
}

function openInTerminal(path) {
    exec(`open -a iTerm ${path}`);
}