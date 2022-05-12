

type Context<Req, Res, Input, Output> = {
    native: {
        req: Req
        res: Res
    }
    pathVariables(): {
        [key: string]: string | undefined
    }
    request(): Input
    send(body: Output): void
}

export type Responder<Req, Res> = {
    new <Input, Output>(handler: (context: Context<Req, Res, Input, Output>) => Promise<void>): {
        input: Input
        output: Output
        handler: (context: Context<Req, Res, Input, Output>) => Promise<void>
    }
}