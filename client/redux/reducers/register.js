import { history } from '..'

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_CONFIRMPASSWORD = 'UPDATE_CONFIRMPASSWORD'

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return { ...state, username: action.username }
    case UPDATE_EMAIL:
      return { ...state, email: action.email }
    case UPDATE_PASSWORD:
      return { ...state, password: action.password }
    case UPDATE_CONFIRMPASSWORD:
      return { ...state, confirmPassword: action.confirmPassword }
    default:
      return state
  }
}

export function updateUsernameField(username) {
  return { type: UPDATE_USERNAME, username }
}

export function updateEmailField(email) {
  return { type: UPDATE_EMAIL, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function updateConfirmPasswordField(confirmPassword) {
  return { type: UPDATE_CONFIRMPASSWORD, confirmPassword }
}

export function register() {
  return (dispatch, getState) => {
    const { username, email, password } = getState().register
    fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then((r) => r.json())
      .then(() => {
        history.push('/auth')
      })
  }
}
