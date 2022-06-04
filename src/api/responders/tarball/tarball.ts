import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {

}

type Output = {

}

export const tarball = new api.Responder<Input, Output>(async (context) => {
    context.native.res.end()

    return

    const {databaseName, databaseVersion} = context.pathVariables()

    if (!databaseName) { throw new Error() }
    if (!databaseVersion) { throw new Error() }

    const {payload} = await database.getPackage({
        databaseName,
        databaseVersion
    })
    
    context.native.res.setHeader('content-disposition', `attachment; filename=${payload?.filename}`)
    context.native.res.setHeader('content-type', 'application/x-gzip')
  
    payload?.stream.pipe(context.native.res) ?? context.native.res.end()
})