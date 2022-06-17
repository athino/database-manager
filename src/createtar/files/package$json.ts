

export const package$json = (arg: {
    name: string
}) => {
    return {
        name: 'package.json',
        content: JSON.stringify({
            name: arg.name,
            version: '1.0.0',
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