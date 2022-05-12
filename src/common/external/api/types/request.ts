

type RespondersBase<K extends Record<string, () => {
    handler: any
}>> = RespondersBaseBase<K>

type RespondersBaseBase<K extends Record<string, () => {
    handler: (context: {
        native: any
        request(): any
        pathVariables(): {
            [key: string]: string | undefined
        }
        send(body: any): void
    }) => Promise<void>
}>> = {
    [M in keyof K]: () => {
        handler: (context: {
            native: any
            request(): ReturnType<Parameters<ReturnType<K[M]>['handler']>[0]['request']>
            pathVariables(): {
                [key: string]: string | undefined
            }
            send(body: Parameters<Parameters<ReturnType<K[M]>['handler']>[0]['send']>[0]): void
        }) => ReturnType<ReturnType<K[M]>['handler']>
    }
}

export type Request = {
    new <Responders extends RespondersBase<Responders>>(): {
        Request: {
            new <P extends keyof Responders>(arg: {
                path: P
                body: ReturnType<Parameters<ReturnType<Responders[P]>['handler']>[0]['request']>
                pathVariables?: {
                    [key: string]: string
                }
            }): {
                (): Promise<void>
                error: boolean
                response: Parameters<Parameters<ReturnType<Responders[P]>['handler']>[0]['send']>[0]
            }
        }
    }
}