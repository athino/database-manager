
type Files = Array<{
  name: string
  content: string
}>

export const createFiles = (arg: {
  methods: Array<{
    name: string
    content: string
  }>
}) => {
  const files: Files = []

  files.push({
    name: 'dejdwe',
    content: 'ewfwef'
  })

  files.push({
    name: 'dejewfwefdwe',
    content: 'ewfwefwefwef'
  })

  return {
    files
  }
}
