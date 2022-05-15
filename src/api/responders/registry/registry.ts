import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    
}

type Output = {

}

export const registry = new api.Responder<Input, Output>(async (context) => {
    const hostDomain = context.native.req.headers.host
    const {scopeName, packageName} = context.pathVariables()
    const protocol = context.native.req.headers['x-forwarded-proto'] ?? 'http'
    const tarballUrl = `${protocol}://${context.native.req.headers.host}/api/tarball`

    console.log(context.native.req.headers)

    if (scopeName !== hostDomain) {
        // throw new Error()
    }

    const {payload} = await database.getPackument({
        databaseName: packageName!,
        tarballUrl: tarballUrl
    })

    console.log(payload?.packument)

    context.native.res.json(payload?.packument)
})