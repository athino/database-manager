import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    id: string
}

type Output = {
    database: any
}

export const getDatabaseDetails = new api.Responder<Input, Output>(async (context) => {

    const result = await database.getDatabase({
        id: context.request().id
    })

    if (result.error) {
        throw new Error()
    }

    if (result.payload === undefined) {
        throw new Error()
    }

    context.send({
        database: result.payload
    })

})