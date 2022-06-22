

export const tarballSource = {
    staticPath: '/api/tarball/:scopeName/:packageName/-/:databaseName-:major(\\d+).:minor(\\d+).:patch(\\d+).tgz' as const,
    buildUrl: (arg: {
        baseUrl: string
        scopeName: string
        packageName: string
        databaseName: string
        major: number
        minor: number
        patch: number
    }) => {
        const posMajor = arg.major < 0 ? -arg.major : arg.major
        const posMinor = arg.minor < 0 ? -arg.minor : arg.minor
        const posPatch = arg.patch < 0 ? -arg.patch : arg.patch
        const a = arg.scopeName
        const b = arg.databaseName
        const c = arg.databaseName
        const d = posMajor
        const e = posMinor
        const f = posPatch

        const path =
            `/api/tarball/${a}/${b}/-/${c}-${d}.${e}.${f}.tgz`

        return {
            url: `${arg.baseUrl}${path}`
        }
    }
}