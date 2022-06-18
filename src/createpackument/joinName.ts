

export const joinName = (arg: {
    scopeName: string
    packageName: string
}) => {
    const name = `@${arg.scopeName}/${arg.packageName}`

    return {
        name: name
    }
}