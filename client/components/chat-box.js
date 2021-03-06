import React from 'react'

import ChatHeader from './chat-top'
import ChatMessages from './chat-messages'
import MessageInput from './message-input'

const Chat = () => {
  return (
    <div className="w-full flex flex-col min-h-screen max-h-screen">
      <ChatHeader />
      <ChatMessages />
      <MessageInput />
    </div>
  )
}

Chat.propTypes = {}

export default Chat
