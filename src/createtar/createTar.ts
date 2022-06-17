import {createShasum} from './createShasum';
import {createBuffer} from './createBuffer';
import {createFiles} from './createFiles';

export const createTar = async (arg: {
  methods: Array<{
    name: string
    content: string
  }>
}) => {
  const {files} = createFiles(arg)

  const {tarBuffer} = await createBuffer({
    files: files
  })

  const {shasum} = createShasum({
    buffer: tarBuffer
  })

  return {
    tarBuffer: tarBuffer,
    tarShasum: shasum
  }
}
