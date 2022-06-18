import {NextApiRequest} from "next"

export const getBaseUrl = (arg: {
    req: NextApiRequest
}) => {
    const protocol = arg.req.headers['x-forwarded-proto'] ?? 'http'
    const baseUrl = `${protocol}://${arg.req.headers.host}`

    return {
        baseUrl: arg.req.headers.host
            ? baseUrl
            : undefined
    }
}