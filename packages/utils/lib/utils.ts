import { execSync } from "child_process";

export function getGitConfig() {
    const config = execSync("git config --local --list ").toString()

    const user = /user.name=(.*)/.exec(config)
    const email = /user.email=(.*)/.exec(config)
    const repo = /remote.origin.url=(.*)/.exec(config)
    const host = /git@(.*):.*.git/.exec(repo?.[1] || "")

    return {
        user: user?.[1],
        email: email?.[1],
        repo: repo?.[1],
        repoHost: host?.[1]
    }
}