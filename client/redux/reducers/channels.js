import shortid from 'shortid'

import { getSocket } from '..'

const ENTER_TO_CHANNEL = 'ENTER_TO_CHANNEL'
const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'
const UPDATE_ALIVE_USERS = 'UPDATE_ALIVE_USERS'
const GET_CHANNELS = 'GET_CHANNELS'

const initialState = {
  channelsList: [],
  active: '',
  messages: {},
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTER_TO_CHANNEL:
      return {
        ...state,
        active: action.active
      }
    case UPDATE_ALIVE_USERS:
      return { ...state, users: action.users }
    case GET_CHANNELS:
      return { ...state, channelsList: action.channels }
    case SEND_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.active.slice(1)]:
            typeof state.messages[action.active.slice(1)] === 'undefined'
              ? [
                  {
                    id: action.id,
                    message: action.message,
                    username: action.username,
                    time: action.time
                  }
                ]
              : [
                  ...state.messages[action.active.slice(1)],
                  {
                    id: action.id,
                    message: action.message,
                    username: action.username,
                    time: action.time
                  }
                ]
        }
      }
    case GET_MESSAGES:
      return {
        ...state,
        messages: { ...state.messages, ...action.newMessages }
      }
    case ADD_NEW_CHANNEL:
      return {
        ...state,
        channelsList: [...state.channelsList, { name: action.name }]
      }
    default:
      return state
  }
}

export function enterToChannel(active) {
  return { type: ENTER_TO_CHANNEL, active }
}

export function getChannels() {
  return (dispatch) => {
    fetch('/api/v1/channels')
      .then((res) => res.json())
      .then(({ channels }) => {
        dispatch({ type: GET_CHANNELS, channels })
      })
  }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const store = getState()
    const { active } = store.channels
    const { user } = store.auth
    const id = shortid.generate()
    getSocket().send(
      JSON.stringify({
        type: SEND_MESSAGE,
        message,
        active,
        username: user.username,
        time: +new Date(),
        id
      })
    )
    if (active.indexOf('#') === 0) {
      fetch('/api/v1/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          channel: active.slice(1),
          message,
          username: user.username,
          time: +new Date(),
          id
        })
      }).then((r) => r.json())
    }
    if (active.indexOf('@') === 0) {
      fetch('/api/v1/direct-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: user.username,
          recipient: active.slice(1),
          message,
          time: +new Date(),
          id
        })
      }).then((r) => r.json())
    }
  }
}

export function sendMessageToChannel(message, id, channel, time, username) {
  return (dispatch) => {
    dispatch({
      type: SEND_MESSAGE,
      id,
      message,
      active: channel,
      username,
      time
    })
  }
}

export function getMessages() {
  return (dispatch) => {
    fetch('/api/v1/message')
      .then((res) => res.json())
      .then(({ messages }) => {
        dispatch({
          type: GET_MESSAGES,
          newMessages: messages.reduce((acc, rec) => {
            return {
              ...acc,
              [rec.channel]:
                typeof acc[rec.channel] === 'undefined'
                  ? [
                      {
                        id: rec.id,
                        message: rec.message,
                        username: rec.username,
                        time: rec.time
                      }
                    ]
                  : [
                      ...acc[rec.channel],
                      {
                        id: rec.id,
                        message: rec.message,
                        username: rec.username,
                        time: rec.time
                      }
                    ]
            }
          }, {})
        })
      })
  }
}

export function getDirectMessages() {
  return (dispatch, getState) => {
    const store = getState()
    const { user } = store.auth
    fetch('/api/v1/direct-message')
      .then((res) => res.json())
      .then(({ directMessages }) => {
        dispatch({
          type: GET_MESSAGES,
          newMessages: directMessages.reduce((acc, rec) => {
            if (user.username === rec.sender) {
              return {
                ...acc,
                [rec.recipient]:
                  typeof acc[rec.recipient] === 'undefined'
                    ? [
                        {
                          id: rec.id,
                          message: rec.message,
                          username: rec.sender,
                          time: rec.time
                        }
                      ]
                    : [
                        ...acc[rec.recipient],
                        {
                          id: rec.id,
                          message: rec.message,
                          username: rec.sender,
                          time: rec.time
                        }
                      ]
              }
            }
            return {
              ...acc,
              [rec.sender]:
                typeof acc[rec.sender] === 'undefined'
                  ? [
                      {
                        id: rec.id,
                        message: rec.message,
                        username: rec.sender,
                        time: rec.time
                      }
                    ]
                  : [
                      ...acc[rec.sender],
                      {
                        id: rec.id,
                        message: rec.message,
                        username: rec.sender,
                        time: rec.time
                      }
                    ]
            }
          }, {})
        })
      })
  }
}

export function addNewChannel(name) {
  return (dispatch) => {
    fetch('/api/v1/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    }).then((r) => r.json())
    dispatch({
      type: ADD_NEW_CHANNEL,
      name
    })
  }
}
