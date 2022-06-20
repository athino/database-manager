import {schema as databaseSchema} from 'schemas/database/database'
import {schema as newDatabaseSchema} from 'schemas/newdatabase/newDatabase'
import {schema as datatabseVersionsCheck} from 'schemas/datatabseversionscheck/datatabseVersionsCheck'
import {schema as packumentCheck} from 'schemas/packumentcheck/packumentCheck'
import {schema as databases} from 'schemas/databases/databases'

export const schemas = {

    database: databaseSchema,
    
    databases: databases,

    newDatabase: newDatabaseSchema,

    datatabseVersionsCheck: datatabseVersionsCheck,

    packumentCheck: packumentCheck

}