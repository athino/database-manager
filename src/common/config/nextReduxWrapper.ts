import {applyMiddleware, createStore, Middleware, Store} from 'redux'
import createSagaMiddleware, {Task} from 'redux-saga'
import {createWrapper} from 'next-redux-wrapper'
import {rootReducer} from 'common/config/rootReducer'
import {rootSaga} from 'common/config/rootSaga'

export interface SagaStore extends Store {
  sagaTask?: Task
}

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension') // eslint-disable-line
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))
  const task = (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

  if (task.isCancelled()) {
    throw new Error('Main saga is cancelled')
  }

  return store
}

export const nextReduxWrapper = createWrapper(makeStore)
