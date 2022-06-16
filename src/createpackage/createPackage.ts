import {createShasum} from './createShasum';
import { createStream } from './createStream';
import {createTarBuffer} from './createTarBuffer';

export const createPackage = async (arg: {
  files: Array<{
    name: string
    content: string
  }>
}) => {
  const {tarBuffer} = await createTarBuffer(arg)

  const {shasum} = createShasum({
    buffer: tarBuffer
  })

  const {stream} = createStream({
    buffer: tarBuffer
  })

  return {
    tarStream: stream,
    tarBuffer: tarBuffer,
    tarShasum: shasum
  }
}
