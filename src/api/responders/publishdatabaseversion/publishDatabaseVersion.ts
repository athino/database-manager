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

    const result = await database.publishDatabaseVersion({
        databaseName: context.request().databaseName,
        version: context.request().version
    })

    await database.createPackage({
        databaseName: context.request().databaseName,
        version: context.request().version,
        scope: 'database-manager'
    })

    if (result.error) {
        throw new Error()
    }

    context.send({
        wasPublished: true
    })

})