export * from './git'
export * from './ide'

export function record(callback: any, name = "执行时间") {
    const time = new Date().getTime()
    console.log(name + " start")
    callback()
    console.log(name + " end")
    console.log(`${ name }：${ new Date().getTime() - time }ms`)
}

export async function recordAsync(name, callback: any) {
    const time = new Date().getTime()
    console.log(name + " start")
    // eslint-disable-next-line no-useless-catch
    try {
        await callback()
    } catch (e) {
        throw e
    }
    console.log(name + " end")
    console.log(`${ name }：${ new Date().getTime() - time }ms`)
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}
