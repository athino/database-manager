import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    databaseName: string
    version: string
}

type Output = {
    wasPublished: boolean
}

export const publishDatabaseVersion = new api.Responder<Input, Output>(async (context) => {

    const {version, databaseName} = context.request()

    const result = await database.publishDatabaseVersion({
        databaseName: databaseName,
        databaseVersion: version
    })

    context.send({
        wasPublished: result.error === false
    })
})