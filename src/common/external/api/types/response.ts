


type RespondersBase<K extends Record<string, () => {
    input: any
    output: any
}>> = {
    [M in keyof K]: () => {
        input: ReturnType<K[M]>['input']
        output: ReturnType<K[M]>['output']
    }
}

export type Response = {
    new <Responders extends RespondersBase<Responders>>(arg: {
        responders: Responders
    }): {
        Response: {
            new (context: {
                req: any
                res: any
            }): () => Promise<void>
        }
    }
}