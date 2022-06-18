import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    name: string
    type: 'major' | 'minor' | 'patch'
}

type Output = {
    version: [number, number, number]
}

export const createDatabaseVersion = new api.Responder<Input, Output>(async (context) => {

    const result = await database.createDatabaseVersion({
        name: context.request().name,
        type: context.request().type
    })

    if (result.error) {
        throw new Error()
    }

    context.send({
        version: [1,0,0]
    })

})
