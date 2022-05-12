import {api} from 'api/api'
import {database} from 'cluster/database'

type Input = {
    databaseId: string
    tableName: string
    version: string
}

type Output = {

}

export const deleteDatabaseTable = new api.Responder<Input, Output>(async (context) => {

    context.request()

    const deleteDatabaseTableResult = await database.deleteDatabaseTable({
        databaseId: context.request().databaseId,
        version: context.request().version,
        tableName: context.request().tableName
    })

    if (deleteDatabaseTableResult.error) {
        throw new Error()
    }


    context.send({})

})