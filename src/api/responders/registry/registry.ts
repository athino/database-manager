import {api} from 'api/api'
import {database} from 'cluster/database'
import {urlInfo} from 'urlinfo/urlInfo'

type Input = {
    
}

type Output = {

}

export const registry = new api.Responder<Input, Output>(async (context) => {
    const {baseUrl} = urlInfo.getBaseUrl({ req: context.native.req })
    const {hostname} = urlInfo.getHostname({ req: context.native.req })
    const {scopeName, packageName} = context.pathVariables()

    if (!baseUrl)                     { throw new Error() }
    if (!hostname)                    { throw new Error() }
    if (!scopeName)                   { throw new Error() }
    if (!packageName)                 { throw new Error() }
    if (scopeName !== hostname)       { throw new Error() }

    const {payload} = await database.getPackument({
        baseUrl: baseUrl,
        scopeName: scopeName,
        databaseName: packageName
    })

    console.log(JSON.stringify(payload?.packument, undefined, 2))

    context.native.res.json(payload?.packument)
})