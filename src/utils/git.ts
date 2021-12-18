import git from 'simple-git'
import { WORKSPACE } from "@/utils/env";
import { recordAsync } from "@/utils/index";

/**
 * 获取当前分支
 *
 * @param path
 */
export async function currentBranch(path: string): Promise<string> {
    try {
        const branches = await git(path).branchLocal()
        return branches.current
    } catch (e) {
        return "无分支"
    }
}

export async function clone(ssh: string, path: string = WORKSPACE): Promise<any> {
    try {
        await recordAsync(`clone ${ ssh }`, async () => git().cwd(path).clone(ssh))
    } catch (e) {
        console.error(`clone 失败` + e)
    }
}

export async function getGitUrl(path: string) {
    return git(path).listRemote(['--get-url']).then(url => url.trim())
}
