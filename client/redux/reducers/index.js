import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import channels from './channels'
import users from './users'
import auth from './auth'
import register from './register'

const createRootReducer = (history) =>
  combineReducers({
    channels,
    users,
    auth,
    register,
    router: connectRouter(history)
  })

export default createRootReducer
