import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import channels from './channels'
import auth from './auth'
import reg from './register'

const createRootReducer = (history) =>
  combineReducers({
    channels,
    auth,
    reg,
    router: connectRouter(history)
  })

export default createRootReducer
