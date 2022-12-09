import Api from 'common/external/api'
import type {NextApiRequest, NextApiResponse} from 'next'

export const api = new Api<NextApiRequest, NextApiResponse>({
    defineSend: ({req, res}) => {
        return (body) => res.json(body)
    },
    defineBody: ({req, res}) => {
        return req.body
    },
    defineUrl: ({req, res}) => {
        return req.url
    }
})
