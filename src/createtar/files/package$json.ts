

export const package$json = (arg: {
    name: string
    scope: string
    semver: string
}) => {
    return {
        name: 'package.json',
        content: JSON.stringify({
            name: `@${arg.scope}/${arg.name}`,
            version: arg.semver,
            license: 'ISC',
            author: 'Unknown',
            description: '',
            main: 'index.js',
            scripts: {
              test: `echo "Error: no test specified" && exit 1`
            }
        }, undefined, 2)
    }
}