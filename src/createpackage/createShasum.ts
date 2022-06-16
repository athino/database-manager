import ssri from 'ssri'

export const createShasum = (arg: {
  buffer: Buffer
}) => {
  const integrity = ssri.fromData(arg.buffer, {
    algorithms: ['sha1', 'sha512']
  })

  return {
    shasum: integrity.hexDigest()
  }
}