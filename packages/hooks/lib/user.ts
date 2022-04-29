import { execSync } from "child_process";
import { getGitConfig } from 'tools-utils'

async function main() {
    const config = getGitConfig()

    const c = {
        scranning: {},
        commitUser: {
            defalut: {
                user: "",
                email: ""
            },
            "repo_host": {
                user: "",
                email: ""
            }
        }
    }
}

main()