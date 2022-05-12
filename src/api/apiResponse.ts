import {api} from './api'
import {Responders} from './responders/responders'

export const {Response} = new api.Response<Responders>({
    responders: new Responders()
})