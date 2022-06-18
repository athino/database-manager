

export const tarballSource = {
    staticPath: '/api/tarball/:scopeName/:packageName/-/:databaseName-:major(\\d+).:minor(\\d+).:patch(\\d+).tgz' as const,
    buildPath: (arg: {
        scopeName: string
        packageName: string
        databaseName: string
        major: number
        minor: number
        patch: number
    }) => {
        const path =
            `/api/tarball/${arg.scopeName}/\
            ${arg.databaseName}/-/${arg.databaseName}\
            -${arg.major}.${arg.minor}.${arg.patch}.tgz`

        return path
    }
}