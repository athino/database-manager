import {NextApiRequest} from "next"

export const getHostname = (arg: {
    req: NextApiRequest
}) => {
    const hostname = arg.req.headers.host?.split(':').at(0)?.split('.').at(0)

    return {
        hostname: hostname
    }
}