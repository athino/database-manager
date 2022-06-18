import {NextApiRequest} from "next"

export const getProtocol = (arg: {
    req: NextApiRequest
}) => {
    const protocol = arg.req.headers['x-forwarded-proto'] ?? 'http'

    return {
        protocol: protocol
    }
}