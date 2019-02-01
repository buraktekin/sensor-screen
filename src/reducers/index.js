import { combineReducers } from 'redux'
import sensorReducer from './sensorReducer'
import testReducers from './testReducers'

export const rootReducer = combineReducers({
  sensorReducers: sensorReducer,
  testReducers: testReducers
})