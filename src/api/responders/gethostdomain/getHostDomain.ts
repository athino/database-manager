import {api} from 'api/api'

type Input = {
    
}

type Output = {
    hostDomain: string
}

export const getHostDomain = new api.Responder<Input, Output>(async (context) => {

    const hostDomain = context.native.req.headers.host

    if (!hostDomain) {
        throw new Error()
    }

    context.send({
        hostDomain: hostDomain
    })

})