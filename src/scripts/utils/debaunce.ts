export const funcDebaunce = <F extends (...args: any[]) => void>(callback: F, time: number) => {
    let timer: ReturnType<typeof setTimeout>

    return function funcTimer (...args: Parameters<F>) {
        clearTimeout(timer)
        timer = setTimeout(() => callback(...args), time)
    }
}