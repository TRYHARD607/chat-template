import React from 'react'
import { useSelector } from 'react-redux'

const ChatHeader = () => {
  const active = useSelector((s) => s.channels.active)
  const channels = useSelector((s) => s.channels.channelsList)
  const findChannel = (name) => Object.keys(channels).find((it) => it === name)
  const activeChannel = { ...channels[findChannel(active)] }

  return (
    <div className="border-b flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-grey-800 text-md mb-1 font-extrabold">{activeChannel.name}</h3>
        <div className="text-grey-500 font-thin text-sm">{activeChannel.descripsion}</div>
      </div>
      <div className="ml-auto hidden md:block">
        <input
          type="search"
          placeholder="Search"
          className="border border-grey-500 rounded-lg p-2"
        />
      </div>
    </div>
  )
}

ChatHeader.propTypes = {}

export default ChatHeader
