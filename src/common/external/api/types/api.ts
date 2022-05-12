import {Request} from './request'
import {Response} from './response'
import {Responder} from './responder'

type Context<Req, Res> = {
    req: Req
    res: Res
}

export type Api = {
    new <Req, Res>(arg: {
        defineSend: (context: Context<Req, Res>) => (body: any) => any
        defineBody: (context: Context<Req, Res>) => any,
        defineUrl: (context: Context<Req, Res>) => string | undefined,
    }): {
        Request: Request
        Response: Response
        Responder: Responder<Req, Res>
    }
}