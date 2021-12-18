import git from 'simple-git'

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