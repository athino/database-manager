import archiver from 'archiver';

export const createTarBuffer = async (arg: {
  files: Array<{
    name: string
    content: string
  }>
}) => {
  return new Promise<{ tarBuffer: Buffer}>((resolve) => {
    const archive = archiver('tar', {
      zlib: { level: 9 },
      gzip: true
    })
  
    const chunks: Buffer[] = []
  
    archive.on('end', () => {
      resolve({
        tarBuffer: Buffer.concat(chunks)
      })
    })
  
    archive.on('data', (chunk) => {
      chunks.push(chunk)
    })

    arg.files.forEach(({name, content}) => {
      archive.append(content, { name })
    })
  
    archive.finalize()
  })
}
