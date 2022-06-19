

export const forEachEntry = <P, K, T extends { [key: string]: K }>(obj: T, iterator: (key: string, value: K) => P) => {
    return Object.entries(obj).reduce((acc, cur) => {
        return {
            ...acc,
            [cur[0]]: iterator(...cur)
        }
    }, {}) as { [N in keyof T]: P }
}
