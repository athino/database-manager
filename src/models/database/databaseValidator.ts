import Ajv from 'ajv'
import {databaseSchema} from './databaseSchema'

const ajv = new Ajv()

export const databaseValidator = ajv.compile(databaseSchema)