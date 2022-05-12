import {all, fork} from '@redux-saga/core/effects'
import {homeSaga} from 'home/homeSaga'

export function* rootSaga () {
  yield all([
    fork(homeSaga)
  ])
}
