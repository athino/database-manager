import {api} from 'api/api'
import {database} from 'cluster/database'
import {urlInfo} from 'urlinfo/urlInfo'

type Input = {

}

type Output = {

}

export const tarball = new api.Responder<Input, Output>(async (context) => {
    const bearer = context.native.req.headers.authorization
    const {scopeName, packageName, databaseName, major, minor, patch} = context.pathVariables()
    const {hostname} = urlInfo.getHostname({ req: context.native.req })

    if (!hostname)                    { throw new Error() }
    if (!scopeName)                   { throw new Error() }
    if (!packageName)                 { throw new Error() }
    if (!databaseName)                { throw new Error() }
    if (!major)                       { throw new Error() }
    if (!minor)                       { throw new Error() }
    if (!patch)                       { throw new Error() }
    if (scopeName !== `@${hostname}`) { throw new Error() }
    if (databaseName !== packageName) { throw new Error() }

    const filename = `${databaseName}-${major}.${minor}.${patch}.tgz`

    const {payload} = await database.getPackage({
        filename: filename
    })
    
    context.native.res.setHeader('content-type', 'application/octet-stream')

    payload?.stream.pipe(context.native.res) ?? context.native.res.status(500).end()
})