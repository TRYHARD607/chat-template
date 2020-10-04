import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { trySignIn } from '../redux/reducers/auth'
import { getChannels, getMessages, getDirectMessages } from '../redux/reducers/channels'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
    }
    dispatch(getChannels())
    dispatch(getMessages())
    setTimeout(() => {
      dispatch(getDirectMessages())
    }, 1000)
  }, [])

  return (
    <div>
      <ToastContainer /> {props.children}
    </div>
  )
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
