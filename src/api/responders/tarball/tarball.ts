import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {

}

type Output = {

}

export const tarball = new api.Responder<Input, Output>(async (context) => {

    console.log(1221)

    const {scopeName, databaseName, fileName} = context.pathVariables()

    if (!scopeName) { throw new Error() }
    if (!databaseName) { throw new Error() }
    if (!fileName) { throw new Error() }

    const version = fileName.split('-').at(-1)

    if (!version) { throw new Error() }

    const {payload} = await database.getPackage({
        databaseName,
        databaseVersion: version
    })
    
    context.native.res.setHeader('content-disposition', `attachment; filename=${payload?.filename}`)
    context.native.res.setHeader('content-type', 'application/x-gzip')
  
    payload?.stream.pipe(context.native.res) ?? context.native.res.end()
})