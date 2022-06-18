import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    name: string
}

type Output = {
    deleted?: boolean
}

export const deleteDatabase = new api.Responder<Input, Output>(async (context) => {

    const result = await database.deleteDatabase({
        name: context.request().name
    })

    if (result.error) {
        throw new Error()
    }

    context.request()

    context.send({
        deleted: result.payload
    })

})