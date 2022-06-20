import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    limit?: number
}

type Output = (Awaited<ReturnType<typeof database.getDatabases>> & { error: false })['payload']

export const initializeDatabases = new api.Responder<Input, Output>(async (context) => {
    const result = await database.getDatabases({
        limit: context.request().limit
    })

    if (result.error) { throw new Error() }

    context.send(result.payload)
})