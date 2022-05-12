import bcryptjs from 'bcryptjs'

export const bcrypt = {

  createPasswordHash: async (arg: {
    password: string
  }) => {
    const salt = await bcryptjs.genSalt(12)
    const hash = await bcryptjs.hash(arg.password, salt)

    return hash
  },

  comparePasswordAgainstHash: async (arg: {
    password: string
    hash: string
  }) => {
    return bcryptjs.compare(arg.password, arg.hash)
  }

}
