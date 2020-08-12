import React from 'react'

import ShowMessages from './show-message'

const ChatMessages = () => {

  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      <ShowMessages />
    </div>
  )
}

ChatMessages.propTypes = {}

export default ChatMessages
