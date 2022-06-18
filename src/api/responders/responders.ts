import {createDatabase} from './createdatabase/createDatabase'
import {createDatabaseTable} from './createdatabasetable/createDatabaseTable'
import {createDatabaseVersion} from './createdatabaseversion/createDatabaseVersion'
import {deleteDatabase} from './deletedatabase/deleteDatabase'
import {deleteDatabaseTable} from './deletedatabasetable/deleteDatabaseTable'
import {getDatabaseDetails} from './getdatabasedetails/getDatabaseDetails'
import {getDatabases} from './getdatabases/getDatabases'
import {initializeDatabases} from './initializedatabases/initializeDatabases'
import {publishDatabaseVersion} from './publishdatabaseversion/publishDatabaseVersion'
import {getHostDomain} from './gethostdomain/getHostDomain'
import {tarball} from './tarball/tarball'
import {registry} from './registry/registry'

export class Responders {
    
    '/api/registry/@:scopeName/:packageName'() {
        return registry
    }

    '/api/tarball/:scopeName/:databaseName/-/:fileName'() {
        return tarball
    }
    
    '/api/create-database'() {
        return createDatabase
    }

    '/api/create-database-table'() {
        return createDatabaseTable
    }

    '/api/create-database-version'() {
        return createDatabaseVersion
    }

    '/api/delete-database'() {
        return deleteDatabase
    }

    '/api/delete-database-table'() {
        return deleteDatabaseTable
    }

    '/api/get-database-details'() {
        return getDatabaseDetails
    }

    '/api/get-databases'() {
        return getDatabases
    }

    '/api/initialize-databases'() {
        return initializeDatabases
    }

    '/api/publish-database-version'() {
        return publishDatabaseVersion
    }

    '/api/get-host-domain'() {
        return getHostDomain
    }

}
