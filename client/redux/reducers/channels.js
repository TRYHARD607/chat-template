import shortid from 'shortid'

const ENTER_TO_CHANNEL = 'ENTER_TO_CHANNEL'
const SEND_MESSAGE = 'SEND_MESSAGE'
const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'

const initialState = {
  channelsList: {
    general: {
      name: 'general',
      descripsion: 'testtesttest',
      messages: []
    },
    hello: {
      name: 'hello',
      descripsion: 'another channel',
      messages: []
    }
  },
  active: 'general'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTER_TO_CHANNEL:
      return {
        ...state,
        active: action.active
      }
    case SEND_MESSAGE:
      return {
        ...state,
        channelsList: {
          ...state.channelsList,
          [action.active]: {
            ...state.channelsList[action.active],
            messages: [
              ...state.channelsList[action.active].messages,
              {
                text: action.message,
                id: action.id,
                tag: action.tag,
                time: action.time
              }
            ]
          }
        }
      }
    case ADD_NEW_CHANNEL:
      return {
        ...state,
        channelsList: {
          ...state.channelsList,
          [action.name]: {
            name: action.name,
            descripsion: '',
            messages: []
          }
        }
      }
    default:
      return state
  }
}

export function enterToChannel(active) {
  return { type: ENTER_TO_CHANNEL, active }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const store = getState()
    const { active } = store.channels
    const { tag } = store.users

    dispatch({
      type: SEND_MESSAGE,
      message,
      active,
      tag,
      time: +new Date(),
      id: shortid.generate()
    })
  }
}

export function addNewChannel(name) {
  return { type: ADD_NEW_CHANNEL, name}
}