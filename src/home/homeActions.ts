import {ActionsUnion, createAction} from 'common/utils/actionUtils'
import {Database, Databases} from 'home/homeTypes'

export enum HomeActionsTypes {
  INITIALIZE_DATABASES = 'INITIALIZE_DATABASES',
  INITIALIZE_DATABASES_FINISH = 'INITIALIZE_DATABASES_FINISH',

  DELETE_DATABASE = 'DELETE_DATABASE',
  DELETE_DATABASE_FINISH = 'DELETE_DATABASE_FINISH',
  CREATE_DATABASE = 'CREATE_DATABASE',
  CREATE_DATABASE_FINISH = 'CREATE_DATABASE_FINISH',
  SELECT_DATABASE = 'SELECT_DATABASE',

  GET_DATABASE_DETAILS = 'GET_DATABASE_DETAILS',
  GET_DATABASE_DETAILS_FINISH = 'GET_DATABASE_DETAILS_FINISH',

  SELECT_DATABASE_VERSION = 'SELECT_DATABASE_VERSION',

  PUBLISH_DATABASE = 'PUBLISH_DATABASE',
  PUBLISH_DATABASE_FINISH = 'PUBLISH_DATABASE_FINISH',

  CREATE_DATABASE_VERSION = 'CREATE_DATABASE_VERSION',
  CREATE_DATABASE_VERSION_FINISH = 'CREATE_DATABASE_VERSION_FINISH',

  CREATE_DATABASE_TABLE = 'CREATE_DATABASE_TABLE',
  CREATE_DATABASE_TABLE_FINISH = 'CREATE_DATABASE_TABLE_FINISH',

  DELETE_DATABASE_TABLE = 'DELETE_DATABASE_TABLE',
  DELETE_DATABASE_TABLE_FINISH = 'DELETE_DATABASE_TABLE_FINISH',

  GET_HOST_DOMAIN = 'GET_HOST_DOMAIN',
  GET_HOST_DOMAIN_FINISH = 'GET_HOST_DOMAIN_FINISH'
}

export const HomeActions = {

  initializeDatabases: () =>
    createAction(HomeActionsTypes.INITIALIZE_DATABASES),

  initializeDatabasesFinish: (databases:  Databases) =>
    createAction(HomeActionsTypes.INITIALIZE_DATABASES_FINISH, {databases}),

  deleteDatabase: (name: string) =>
    createAction(HomeActionsTypes.DELETE_DATABASE, {name}),

  deleteDatabaseFinish: (name: string) =>
    createAction(HomeActionsTypes.DELETE_DATABASE_FINISH, {name}),

  createDatabase: (name: string) =>
    createAction(HomeActionsTypes.CREATE_DATABASE, {name}),

  createDatabaseFinish: (database: Database) =>
    createAction(HomeActionsTypes.CREATE_DATABASE_FINISH, {database}),

  selectDatabase: (name: string) =>
    createAction(HomeActionsTypes.SELECT_DATABASE, {name}),

  getDatabaseDetails: (id: string) =>
    createAction(HomeActionsTypes.GET_DATABASE_DETAILS, {id}),

  getDatabaseDetailsFinish: (database: Database) =>
    createAction(HomeActionsTypes.GET_DATABASE_DETAILS_FINISH, {database}),

  selectDatabaseVersion: (id: string) =>
    createAction(HomeActionsTypes.SELECT_DATABASE_VERSION, {id}),

  publishDatabase: (databaseName: string, id: string) =>
    createAction(HomeActionsTypes.PUBLISH_DATABASE, {databaseName, id}),

  publishDatabaseFinish: (databaseName: string, id: string) =>
    createAction(HomeActionsTypes.PUBLISH_DATABASE_FINISH, {databaseName, id}),

  createDatabaseVersion: (name: string) =>
    createAction(HomeActionsTypes.CREATE_DATABASE_VERSION, {name}),

  createDatabaseVersionFinish: () =>
    createAction(HomeActionsTypes.CREATE_DATABASE_VERSION_FINISH),

  createDatabaseTable: (id: string, version: string) =>
    createAction(HomeActionsTypes.CREATE_DATABASE_TABLE, {id, version}),

  createDatabaseTableFinish: () =>
    createAction(HomeActionsTypes.CREATE_DATABASE_TABLE_FINISH),

  deleteDatabaseTable: (id: string, version: string, tableName: string) =>
    createAction(HomeActionsTypes.DELETE_DATABASE_TABLE, {id, version, tableName}),

  deleteDatabaseTableFinish: () =>
    createAction(HomeActionsTypes.DELETE_DATABASE_TABLE_FINISH),

  getHostUrl: () =>
    createAction(HomeActionsTypes.GET_HOST_DOMAIN),

  getHostUrlFinish: (hostDomain: string) =>
    createAction(HomeActionsTypes.GET_HOST_DOMAIN_FINISH, {hostDomain}),

}

export type HomeActionsType = ActionsUnion<typeof HomeActions>
