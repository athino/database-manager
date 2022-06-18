

export const objectFromEntries = <T, K>(array: T[], iterator: (cur: T, idx?: number) => { key: string, value: K}): { [key: string]: K } => {
  return array.reduce((acc, cur, idx) => {
    const {key, value} = iterator(cur, idx)
    return {
      ...acc,
      [key]: value
    }
  }, {})
}
