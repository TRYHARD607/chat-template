import React from 'react'
import ReactMarkdown from 'react-markdown'
import format from 'date-fns/format'
import { useSelector } from 'react-redux'

const ShowMessages = () => {
  const active = useSelector((s) => s.channels.active)
  const channels = useSelector((s) => s.channels.channelsList)
  const findChannel = (name) => Object.keys(channels).find((it) => it === name)
  const activeChannel = { ...channels[findChannel(active)] }
  return (
    <div>
      {activeChannel.messages.map((message) => {
        return (
          <div key={message.id} className="flex items-start mb-4">
            <img
              alt="ssss"
              src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
              className="w-10 h-10 rounded mr-3"
            />
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="font-bold text-md mr-2 font-sans">{message.tag}</span>
                <span className="text-grey-500 text-xs font-light">
                  {format(message.time, 'MM/dd/yyyy k:m:s')}
                </span>
              </div>
              <p className="font-light text-md text-grey-800 pt-1">
                <ReactMarkdown source={message.text} />
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

ShowMessages.propTypes = {}

export default ShowMessages
