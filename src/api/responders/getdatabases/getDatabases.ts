import {api} from 'api/api'

type Input = {
    foo: number
}

type Output = {
    bar: boolean
}

export const getDatabases = new api.Responder<Input, Output>(async (context) => {

    const {foo} = context.request()

    context.send({
        bar: false
    })

})
