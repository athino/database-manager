import {api} from 'api/api'
import {database} from 'cluster/database'
import {createTar} from 'createtar/createTar'

type Input = {
    limit?: number
}

type Output = {
    selected: {
        id: string
        name: string
        versions: any[]
    }
    databases: Array<{
        id: string
        name: string
    }>
}

export const initializeDatabases = new api.Responder<Input, Output>(async (context) => {

    const result = await database.getDatabases({
        limit: context.request().limit
    })


    if (result.error) {
        throw new Error()
    }

    context.send({
        databases: result.payload.databases,
        selected: result.payload.selected
    })

})