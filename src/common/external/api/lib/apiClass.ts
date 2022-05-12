import axios from 'axios'
import {getAllFuncs} from './getAllFuncs'
import { pathToRegexp, match, parse, compile } from "path-to-regexp";

export class ApiClass {
    Response: any
    Request: any
    Responder: any

    constructor(arg1: any) {

        this.Request = class Request {
            Request: any

            constructor() {
                this.Request = class Request {
                    error = true as any
                    response = undefined as any
                    constructor(arg: {
                        path: string
                        body: any
                        pathVariables: any
                    }) {
                        const _this = Object.assign(async () => {
                            try {
                                const toPath = compile(arg.path, { encode: encodeURIComponent })

                                const compiledPath = arg.pathVariables ? toPath(arg.pathVariables) : arg.path
                                const result = await axios.post(compiledPath, arg.body)

                                if (result.status === 200) {
                                    if ((result.data as any).error === false) {
                                        _this.response = (result as any).data?.payload
                                        _this.error = false
                                    } else {
                                        _this.response = undefined
                                        _this.error = true
                                    }
                                }
                            } catch {
                                _this.response = undefined
                                _this.error = true
                            }
                        }, this)
                        return _this
                    }
                }
            }
        }

        this.Responder = class Responder {
            handler: any

            constructor(arg5: any) {
                this.handler = arg5
            }
        }

        this.Response = class Response {
            Response: any

            constructor(arg2: any) {

                const responders = getAllFuncs(arg2.responders).reduce((acc, cur, idx) => {
                    return {
                        ...acc,
                        [cur]: arg2.responders[cur]
                    }
                }, {} as any)

                this.Response = class Response {

                    constructor(arg3: any) {

                        const _this = Object.assign(async () => {
                            const send = arg1.defineSend(arg3)
                            const incomingBody = arg1.defineBody(arg3)
                            const incomingUrl: string = arg1.defineUrl(arg3)

                            let paramsObj: {} | undefined = undefined

                            const responder1 = Object.entries(responders).find(([key, entry]) => {
                                const matchPath = match(key, { decode: decodeURIComponent });

                                const matched = matchPath(decodeURIComponent(incomingUrl))

                                if (matched) {

                                    paramsObj = Object.entries(((matched as any)?.params) ?? {})?.reduce((acc, cur) => {
                                        return {
                                            [cur[0]]: cur[1],
                                            ...acc
                                        }
                                    }, {})
                                        
                                }

                                return !!matched
                            })

                            const responder = (responder1 as any)[1]().handler

                            await responder({
                                send: (bdy: any) => send({
                                    error: false,
                                    payload: bdy
                                }),
                                pathVariables: () => paramsObj,
                                request: () => incomingBody,
                                native: {
                                    req: arg3.req,
                                    res: arg3.res
                                }
                            })
                        }, this)
                        
                        return _this
                    }
                }

            }

        }

    }

}