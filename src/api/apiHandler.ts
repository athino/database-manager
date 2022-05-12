import {NextApiRequest, NextApiResponse} from 'next'
import {Response} from './apiResponse'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = new Response({ req, res })

    await response()
}