import * as mongodb from 'mongodb'
import {connectToDatabase} from './lib/connectToDatabase'

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type Connection = () => mongodb.MongoClient

type DatabaseInputBase = {
  [key: string]: (...arg: any[]) => Promise<any> // eslint-disable-line
}

type DatabaseObject<DatabaseInput extends DatabaseInputBase> = {
  [K in keyof DatabaseInput]: (...arg: Parameters<DatabaseInput[K]>) => Promise<{
    error: false
    payload: Awaited<ReturnType<DatabaseInput[K]>>
  } | {
    error: true
    payload: undefined  
  }>
}

type Database = {
  new <DatabaseInput extends DatabaseInputBase>(config: {
    uri: string
    methods: (connection: Connection) => DatabaseInput
  }): DatabaseObject<DatabaseInput>
}

export const Database = class DatabaseClass {
  constructor(config: {
    uri: string
    methods: (connection: Connection) => any // eslint-disable-line
  }) {
    const methods = Object.keys(config.methods((() => ({})) as Connection))
    const database = {} as any // eslint-disable-line

    methods.forEach((methodName) => {
      database[methodName] = async (...arg: any[]) => { // eslint-disable-line
        try {
          const {client} = await connectToDatabase({ uri: config.uri })
          const callResult = await config.methods(() => client)[methodName](...arg)

          return {
            error: false as const,
            payload: callResult
          }
        } catch {
          return {
            error: true as const,
            payload: undefined
          }
        }
      }
    })

    Object.assign(this, database)
  }
} as Database

export {mongodb}
