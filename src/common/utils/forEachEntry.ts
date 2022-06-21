

export const forEachEntry = <N, T extends Record<string, any>>(obj: T, iterator: (key: keyof T, val: T[keyof T]) => N) => {
    return Object.entries(obj).reduce((acc, cur) => {
        return {
            ...acc,
            [cur[0]]: iterator(...cur)
        }
    }, {}) as {
        [K in keyof T]: N
    }
}