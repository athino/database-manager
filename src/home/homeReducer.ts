import {HomeActionsType, HomeActionsTypes} from 'home/homeActions'
import {ClientDatabase} from './homeTypes'

type HomeState = {
  databases: ClientDatabase[]
  activeDatabase?: ClientDatabase

  isFetchingDatabases: boolean
  isCreatingDatabase: boolean
  idsOfDatabasesBeingDeleted: Array<string>
  isCreatingDatabaseVersion: boolean
  hostDomain?: string
}

const initialHomeState: HomeState = {
  databases: [],
  activeDatabase: undefined,

  isFetchingDatabases: false,
  isCreatingDatabase: false,
  idsOfDatabasesBeingDeleted: [],
  isCreatingDatabaseVersion: false,
  hostDomain: undefined
}

export const homeReducer = (
  state = initialHomeState,
  action: HomeActionsType
): HomeState => {
  switch (action.type) {

    case HomeActionsTypes.INITIALIZE_DATABASES:
      return {
        ...state,
        isFetchingDatabases: true
      }

    case HomeActionsTypes.INITIALIZE_DATABASES_FINISH:
      return {
        ...state,
        isFetchingDatabases: false,
        databases: action.payload.databases,
        activeDatabase: action.payload.databases[0]
      }

    case HomeActionsTypes.DELETE_DATABASE:
      return {
        ...state,
        activeDatabase: state.activeDatabase?.name === action.payload.name
          ? { ...state.activeDatabase, isBeingDeleted: true }
          : state.activeDatabase,
        databases: state.databases.map((database) => ({
          ...database,
          isBeingDeleted: action.payload.name === database.name
            ? true
            : database.isBeingDeleted
        }))
      }

    case HomeActionsTypes.DELETE_DATABASE_FINISH:
      const updatedDatabaseList = state.databases.filter(({id}) => {
        return id !== action.payload.id
      })

      const newActiveDatabase = state.activeDatabase?.id === action.payload.id
        ? updatedDatabaseList[0]
        : state.activeDatabase

      return {
        ...state,
        databases: updatedDatabaseList,
        activeDatabase: newActiveDatabase
      }

    case HomeActionsTypes.CREATE_DATABASE:
      return {
        ...state,
        isCreatingDatabase: true,
      }

    case HomeActionsTypes.CREATE_DATABASE_FINISH:
      return {
        ...state,
        databases: [...state.databases, action.payload.database],
        isCreatingDatabase: false,
      }

    case HomeActionsTypes.SELECT_DATABASE:
      const index = state.databases.findIndex(({name}) => {
        return name === action.payload.name
      })

      const db = state.databases[index]

      if (db) {
        db.isBeingUpdated = true
        state.databases[index] = db
      }

      return {
        ...state,
        activeDatabase: db
      }

    case HomeActionsTypes.GET_DATABASE_DETAILS:
      return {
        ...state
      }

    case HomeActionsTypes.GET_DATABASE_DETAILS_FINISH:
      return {
        ...state,
        activeDatabase: state.activeDatabase?.id === action.payload.database.id
          ? action.payload.database
          : state.activeDatabase,
        databases: state.databases.map((database) => {
          return action.payload.database.id === database.id
            ? action.payload.database
            : database
        })
      }

    case HomeActionsTypes.SELECT_DATABASE_VERSION:
      return {
        ...state
      }

    case HomeActionsTypes.PUBLISH_DATABASE: {
      const {databaseName, version} = action.payload

      return {
        ...state,
        activeDatabase: state.activeDatabase ? {
          ...state.activeDatabase,
          versions: state.activeDatabase.versions.map((ver) => ({
            ...ver,
            isBeingPublished: ver.semver === version ? true : ver.isBeingPublished
          })),
          activeVersion: {
            ...state.activeDatabase.activeVersion,
            isBeingPublished: true
          }
        } : undefined,
        databases: state.databases.map((database) => {
          return database.name !== databaseName ? database : {
            ...database,
            versions: database.versions.map((ver) => ({
              ...ver,
              isBeingPublished: ver.semver === version
                ? true : ver.isBeingPublished
            }))
          }
        })
      }
    }

    case HomeActionsTypes.PUBLISH_DATABASE_FINISH: {
      const {databaseName, version} = action.payload

      return {
        ...state,
        activeDatabase: state.activeDatabase ? {
          ...state.activeDatabase,
          versions: state.activeDatabase.versions.map((ver) => ({
            ...ver,
            status: 'published',
            isBeingPublished: ver.semver === version ? false : ver.isBeingPublished
          })),
          activeVersion: {
            ...state.activeDatabase.activeVersion,
            status: 'published',
            isBeingPublished: false
          }
        } : undefined,
        databases: state.databases.map((database) => {
          return database.name !== databaseName ? database : {
            ...database,
            versions: database.versions.map((ver) => ({
              ...ver,
              status: 'published',
              isBeingPublished: ver.semver === version
                ? false : ver.isBeingPublished
            }))
          }
        })
      }
    }

    case HomeActionsTypes.CREATE_DATABASE_VERSION:
      action.payload.name
      
      return {
        ...state,
        isCreatingDatabaseVersion: true
      }

    case HomeActionsTypes.CREATE_DATABASE_VERSION_FINISH:
      return {
        ...state,
        isCreatingDatabaseVersion: false
      }

    case HomeActionsTypes.GET_HOST_DOMAIN_FINISH:
      return {
        ...state,
        hostDomain: action.payload.hostDomain
      }

    default:
      return {
        ...state
      }
    }

}
