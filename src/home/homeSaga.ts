import {takeLatest, delay, put, all, call, fork, take, cancel} from 'redux-saga/effects'
import {HomeActionsTypes, HomeActions} from 'home/homeActions'
import {Request} from 'api/apiRequest'
import {Task} from 'redux-saga'
import {forEachEntry} from 'common/utils/forEachEntry'

function* initializeDatabasesSaga() {

  const request = new Request({
    path: '/api/initialize-databases',
    body: {
      limit: 50
    }
  })

  yield all({
    delay: delay(500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.initializeDatabasesFinish({}))
  } else {

    const databases = forEachEntry(request.response.databases, (_name, database) => ({
      ...database,
      isBeingDeleted: false,
      isBeingUpdated: false,
      activeVersionSemver: Object.keys(database.versions).at(0)!,
      versions: forEachEntry(database.versions, (_semver, version) => ({
        ...version,
        isBeingPublished: false
      }))
    }))

    yield put(HomeActions.initializeDatabasesFinish(databases))
  }

}

function* createDatabaseSaga(action: ReturnType<typeof HomeActions.createDatabase>) {

  const request = new Request({
    path: '/api/create-database',
    body: {
      name: action.payload.name
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {

  } else {
    yield put(HomeActions.createDatabaseFinish({
      name: action.payload.name,
      versions: {},
      createdAt: 0,
      isBeingUpdated: false,
      isBeingDeleted: false,
      activeVersionSemver: '1.0.0'
    }))
  }

}


function* publishDatabaseSaga(action: ReturnType<typeof HomeActions.publishDatabase>) {
  const {databaseName, id} = action.payload
  
  const request = new Request({
    path: '/api/publish-database-version',
    body: {
      name: databaseName,
      id: id
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  yield put(HomeActions.publishDatabaseFinish(databaseName, semver))


}

function* createDatabaseVersionSaga(action: ReturnType<typeof HomeActions.createDatabaseVersion>) {

  const request = new Request({
    path: '/api/create-database-version',
    body: {
      name: action.payload.name,
      type: 'major'
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.createDatabaseVersionFinish())
  } else {
    request.response
    yield put(HomeActions.createDatabaseVersionFinish())
  }

}

const watchList = () => fork(function*() {
  const tasks: Record<string, Task> = {}
  while (true) {
    const action: ReturnType<typeof HomeActions.selectDatabase> = yield take(HomeActionsTypes.SELECT_DATABASE)
    const task = tasks[action.payload.name]

    if (task) {
      yield cancel(task)
    }

    tasks[action.payload.name] = yield fork(function*() {
      yield call(getDatabaseDetailsSaga, action)
    })
  }
})

function* getDatabaseDetailsSaga(action: ReturnType<typeof HomeActions.selectDatabase>) {

  const request = new Request({
    path: '/api/get-database-details',
    body: {
      name: action.payload.name
    }
  })

  yield all({
    delay: delay(500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {

  } else {

    const database = {
      ...request.response.database,
      isBeingDeleted: false,
      isBeingUpdated: false,
      activeVersionSemver: Object.keys(request.response.database.versions).at(0)!,
      versions: forEachEntry(request.response.database.versions, (_key, value) => ({
        isBeingPublished: false,
        ...value
      }))
    }

    yield put(HomeActions.getDatabaseDetailsFinish(database))
  }

}

function* deleteDatabaseSaga(action: ReturnType<typeof HomeActions.deleteDatabase>) {

  const request = new Request({
    path: '/api/delete-database',
    body: {
      name: action.payload.name
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.deleteDatabaseFinish(action.payload.name))
  } else {
    yield put(HomeActions.deleteDatabaseFinish(action.payload.name))
  }

}

function* createDatabaseTableSaga(action: ReturnType<typeof HomeActions.createDatabaseTable>) {

  const request = new Request({
    path: '/api/create-database-table',
    body: {
      id: action.payload.id
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.createDatabaseTableFinish())
  } else {
    yield put(HomeActions.createDatabaseTableFinish())
  }

}

function* deleteDatabaseTableSaga(action: ReturnType<typeof HomeActions.deleteDatabaseTable>) {

  const request = new Request({
    path: '/api/delete-database-table',
    body: {
      databaseId: action.payload.id,
      version: action.payload.version,
      tableName: action.payload.tableName
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.deleteDatabaseTableFinish())
  } else {
    yield put(HomeActions.deleteDatabaseTableFinish())
  }

}


function* getHostDomainSaga() {

  const request = new Request({
    path: '/api/get-host-domain',
    body: {}
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  if (!request.error) {
    yield put(HomeActions.getHostUrlFinish(request.response.hostDomain))
  }

}

export function* homeSaga() {
  yield watchList()
  yield takeLatest(HomeActionsTypes.INITIALIZE_DATABASES, initializeDatabasesSaga)
  yield takeLatest(HomeActionsTypes.DELETE_DATABASE, deleteDatabaseSaga)
  yield takeLatest(HomeActionsTypes.CREATE_DATABASE, createDatabaseSaga)
  yield takeLatest(HomeActionsTypes.CREATE_DATABASE_TABLE, createDatabaseTableSaga)
  yield takeLatest(HomeActionsTypes.DELETE_DATABASE_TABLE, deleteDatabaseTableSaga)
  yield takeLatest(HomeActionsTypes.GET_HOST_DOMAIN, getHostDomainSaga)
  yield takeLatest(HomeActionsTypes.PUBLISH_DATABASE, publishDatabaseSaga)
}
