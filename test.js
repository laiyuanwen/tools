const simpleGit = require('simple-git')
const git = simpleGit('/Users/bytedance/code/ilearning_teacher/bailongma');

const branch = git.branchLocal()
branch.then((res) => {
    console.log(res.current)
})
