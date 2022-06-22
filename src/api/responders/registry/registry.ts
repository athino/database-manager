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

    console.log(`1-${baseUrl}`)
    console.log(`2-${hostname}`)
    console.log(`3-${scopeName}`)
    console.log(`4-${packageName}`)

    if (!baseUrl)                     { throw new Error() }
    console.log(`5`)

    if (!hostname)                    { throw new Error() }
    console.log(`6`)

    if (!scopeName)                   { throw new Error() }
    console.log(`7`)

    if (!packageName)                 { throw new Error() }
    console.log(`8`)

    if (scopeName !== hostname)       { throw new Error() }
    console.log(`9`)


    const {payload} = await database.getPackument({
        baseUrl: baseUrl,
        scopeName: scopeName,
        databaseName: packageName
    })

    console.log(`10-${JSON.stringify(payload)}`)

    context.native.res.json(payload?.packument)
})