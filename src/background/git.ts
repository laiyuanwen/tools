const git = require('simple-git')

/**
 * 获取当前分支
 *
 * @param path
 */
export async function currentBranch(path: String) {
    const branches = await git(path).branchLocal()
    return branches.current
}