import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    name: string
}

type Output = {
    id: string
}

export const createDatabase = new api.Responder<Input, Output>(async (context) => {

    const result = await database.createDatabase({
        name: context.request().name
    })

    if (result.error) { throw new Error() }

    context.send({
        id: result.payload.id
    })

})
