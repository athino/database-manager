import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    
}

type Output = {

}

export const registry = new api.Responder<Input, Output>(async (context) => {
    const hostname = context.native.req.headers.host?.split(':')[0]
    const {scopeName, packageName} = context.pathVariables()
    const protocol = context.native.req.headers['x-forwarded-proto'] ?? 'http'
    const tarballUrl = `${protocol}://${context.native.req.headers.host}/api/tarball`

    if (scopeName !== `@${hostname}`) {
        throw new Error()
    }

    const {payload} = await database.getPackument({
        databaseName: packageName!,
        tarballUrl: tarballUrl,
        scopeName: scopeName
    })

    context.native.res.json(payload?.packument)
})