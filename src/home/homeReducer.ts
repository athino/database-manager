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
      const {databaseName, id} = action.payload
      const version = state.databases[databaseName]?.versions[id]

      if (version) {
        version.isBeingPublished = true
      }

      return {
        ...state
      }
    }

    case HomeActionsTypes.PUBLISH_DATABASE_FINISH: {
      const {databaseName, id} = action.payload

      const database = state.databases[databaseName]!
      const version = database.versions[id]!

      return {
        ...state,
        databases: {
          ...state.databases,
          [database.name]: {
            ...database,
            versions: {
              ...database.versions,
              [id]: {
                ...version,
                isBeingPublished: false
              }
            }
          }
        }
      }
    }

    case HomeActionsTypes.CREATE_DATABASE_VERSION:
      action.payload.name
      
      return {
        ...state,
      }

    case HomeActionsTypes.CREATE_DATABASE_VERSION_FINISH:
      return {
        ...state,
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
