import React from 'react'

const MessageInput = () => {
  return (
    <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
      <span className="text-3xl text-grey px-3 pb-2 border-r-2 border-grey leading-15">+</span>
      <input type="text" className="w-full px-4" placeholder="Message to #general" />
    </div>
  )
}

MessageInput.propTypes = {}

export default MessageInput
