import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../redux/reducers/channels'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const active = useSelector((s) => s.channels.active)

  const dispatch = useDispatch()

  return (
    <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
      <span className="text-3xl text-grey px-3 pb-2 border-r-2 border-grey leading-15">+</span>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4"
        placeholder={`Message to #${active}`}
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch(sendMessage(message))
          setMessage('')
        }}
      >
        Send
      </button>
    </div>
  )
}

MessageInput.propTypes = {}

export default MessageInput
