import {takeLatest, delay, put, all, call, takeEvery, fork, take, cancel} from 'redux-saga/effects'
import {HomeActionsTypes, HomeActions} from 'home/homeActions'
import {Request} from 'api/apiRequest'
import {Task} from 'redux-saga'

function* initializeDatabasesSaga() {

  const request = new Request({
    path: '/api/initialize-databases',
    body: {
      limit: 1
    }
  })

  yield all({
    delay: delay(500),
    response: call(async () => {
      await request()
    })
  })

  if (request.error) {
    yield put(HomeActions.initializeDatabasesFinish([]))
  } else {

    const databases = request.response.databases.map((database) => ({
      isBeingDeleted: false,
      isBeingUpdated: false,
      versions: [],
      ...(database.id === request.response.selected.id
        ? request.response.selected
        : database),
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
      versions: [],
      isBeingUpdated: false,
      isBeingDeleted: false,
      activeVersion: undefined
    }))
  }

}


function* publishDatabaseSaga(action: ReturnType<typeof HomeActions.publishDatabase>) {
  const {databaseName, version} = action.payload

  const request = new Request({
    path: '/api/publish-database-version',
    body: {
      databaseName: databaseName,
      version: version
    }
  })

  yield all({
    delay: delay(1500),
    response: call(async () => {
      await request()
    })
  })

  yield put(HomeActions.publishDatabaseFinish(databaseName, version))


}

function* createDatabaseVersionSaga(action: ReturnType<typeof HomeActions.createDatabaseVersion>) {

  const request = new Request({
    path: '/api/create-database-version',
    body: {
      databaseId: action.payload.databaseId,
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
    const task = tasks[action.payload.id]

    if (task) {
      yield cancel(task)
    }

    tasks[action.payload.id] = yield fork(function*() {
      yield call(getDatabaseDetailsSaga, action)
    })
  }
})

function* getDatabaseDetailsSaga(action: ReturnType<typeof HomeActions.selectDatabase>) {

  const request = new Request({
    path: '/api/get-database-details',
    body: {
      id: action.payload.id
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

    const db = request.response.database

    const database = {
      name: db.name,
      id: db.id,
      isBeingDeleted: false,
      isBeingUpdated: false,
      versions: db.versions.map((vers) => ({
        isBeingPublished: false,
        version: vers.version,
        packageUrl: `database-${vers.version}`,
        status: vers.status,
        tables: vers.tables,
        methods: vers.methods
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
  yield takeLatest(HomeActionsTypes.INITIALIZE_DATABASES, initializeDatabasesSaga)
  yield watchList()
  yield takeLatest(HomeActionsTypes.DELETE_DATABASE, deleteDatabaseSaga)
  yield takeLatest(HomeActionsTypes.CREATE_DATABASE, createDatabaseSaga)
  yield takeLatest(HomeActionsTypes.CREATE_DATABASE_TABLE, createDatabaseTableSaga)
  yield takeLatest(HomeActionsTypes.DELETE_DATABASE_TABLE, deleteDatabaseTableSaga)
  yield takeLatest(HomeActionsTypes.GET_HOST_DOMAIN, getHostDomainSaga)
  yield takeLatest(HomeActionsTypes.PUBLISH_DATABASE, publishDatabaseSaga)
}
