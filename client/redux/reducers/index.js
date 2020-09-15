import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import channels from './channels'
import users from './users'
import auth from './auth'

const createRootReducer = (history) =>
  combineReducers({
    channels,
    users,
    auth,
    router: connectRouter(history)
  })

export default createRootReducer
