import {api} from 'api/api'
import {database} from 'cluster/database'
import {getHostname} from 'urlinfo/getHostname'

type Input = {
    name: string
    id: string
}

type Output = {
    wasPublished: boolean
}

export const publishDatabaseVersion = new api.Responder<Input, Output>(async (context) => {
    const {id, name} = context.request()
    const {hostname} = getHostname({ req: context.native.req })


    if (!hostname) { throw new Error() }

    const result = await database.publishDatabaseVersion({
        name: name,
        id: id,
        scope: hostname
    })

    context.send({
        wasPublished: result.error === false
    })
})