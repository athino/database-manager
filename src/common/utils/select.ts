import {RootState} from 'common/config/rootReducer'
import {select as sagaSelect, SelectEffect} from 'redux-saga/effects'

export const select = <Selected>(selector: (state: RootState) => Selected): SelectEffect => {
  return sagaSelect(selector)
}
