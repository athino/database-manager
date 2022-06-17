import {Readable} from 'stream'

export const createStream = (arg: {
    buffer: Buffer
}) => {
    return {
        stream: Readable.from(arg.buffer.toString())
    }
}