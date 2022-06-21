import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    name: string
    id: string
}

type Output = {
    wasPublished: boolean
}

export const publishDatabaseVersion = new api.Responder<Input, Output>(async (context) => {
    const {id, name} = context.request()

    const result = await database.publishDatabaseVersion({
        name: name,
        id: id
    })

    context.send({
        wasPublished: result.error === false
    })
})