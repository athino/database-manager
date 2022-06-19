import {HomeActionsType, HomeActionsTypes} from 'home/homeActions'
import {Database} from 'home/homeTypes'

type HomeState = {
  databases: {
    [name: string]: Database
  }
  activeDatabase?: string
  isFetchingDatabases: boolean
  isCreatingDatabase: boolean
  hostDomain?: string
}

const initialHomeState: HomeState = {
  databases: {},
  activeDatabase: undefined,
  isFetchingDatabases: false,
  isCreatingDatabase: false,
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
        activeDatabase: 'test'
      }

    case HomeActionsTypes.DELETE_DATABASE: {
      const database = state.databases[action.payload.name]
      
      if (!database) { return state}

      return {
        ...state,
        databases: {
          ...state.databases,
          [database.name]: {
            ...database,
            isBeingDeleted: true
          }
        }
      }
    }

    case HomeActionsTypes.DELETE_DATABASE_FINISH: {
      delete state.databases[action.payload.name]

      return {
        ...state,
        activeDatabase: state.activeDatabase === action.payload.name
          ? Object.keys(state.databases).at(0)
          : state.activeDatabase
      } 
    }

    case HomeActionsTypes.CREATE_DATABASE:
      return {
        ...state,
        isCreatingDatabase: true
      }

    case HomeActionsTypes.CREATE_DATABASE_FINISH:
      return {
        ...state,
        isCreatingDatabase: false,
        databases: {
          ...state.databases,
          [action.payload.database.name]: action.payload.database
        }
      }

    case HomeActionsTypes.SELECT_DATABASE:
      return {
        ...state,
        activeDatabase: action.payload.name
      }

    case HomeActionsTypes.GET_DATABASE_DETAILS:
      return {
        ...state
      }

    case HomeActionsTypes.GET_DATABASE_DETAILS_FINISH:
      return {
        ...state,
        databases: {
          ...state.databases,
          [action.payload.database.name]: action.payload.database
        }
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
