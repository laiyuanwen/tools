export * from './git'
export * from './cache'
export * from './ide'

export function record(callback: any, name = "执行时间") {
    const time = new Date().getTime()
    callback()
    console.log(`${name}：${new Date().getTime() - time}ms`)
}

export async function recordAsync(callback: any, name = "执行时间") {
    const time = new Date().getTime()
    await callback()
    console.log(`${name}：${new Date().getTime() - time}ms`)
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}
