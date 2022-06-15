import { getGitConfig, readCommitUserConfig } from 'tools-utils'

async function main() {
    const config = getGitConfig()
    const commitUser = readCommitUserConfig()

    let user
    let email
    if (!config.repoHost || !commitUser[config.repoHost]) {
        user = commitUser.defalut?.user
        email = commitUser.defalut?.email
    } else {
        user = commitUser[config.repoHost]?.user
        email = commitUser[config.repoHost]?.email
    }

    if (!user || !email) {
        console.log("✅【提交用户】未配置检查内容，跳过检查");
        process.exit(0)
    } else if (config.user == user && config.email == email) {
        console.log("✅【提交用户】检查通过");
        process.exit(0)
    } else {
        console.log("❌【提交用户】检查失败", config, user, email);
        process.exit(1)
    }
}

main()