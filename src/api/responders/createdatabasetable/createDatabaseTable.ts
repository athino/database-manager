import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    id: string
}

type Output = {

}

export const createDatabaseTable = new api.Responder<Input, Output>(async (context) => {

    const result = await database.createDatabase({
        name: context.request().id
    })

    if (result.error) {
        throw new Error()
    }

    context.send({})

})
