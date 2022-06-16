import {createShasum} from './createShasum';
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

  console.log(shasum)
  
}
