import {index$d$ts} from "./files/index$d$ts"
import {index$js} from "./files/index$js"
import {package$json} from "./files/package$json"

type Files = Array<{
  name: string
  content: string
}>

export const createFiles = (arg: {
  name: string
  scope: string
  semver: string
  methods: Array<{
    name: string
    content: string
  }>
}) => {
  const files: Files = []

  files.push(index$js())
  files.push(package$json({ name: arg.name, scope: arg.scope, semver: arg.semver }))
  files.push(index$d$ts())

  return {
    files
  }
}
