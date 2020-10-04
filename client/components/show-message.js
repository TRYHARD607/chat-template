import React from 'react'
import ReactMarkdown from 'react-markdown'
import format from 'date-fns/format'
import { useSelector } from 'react-redux'

const ShowMessages = () => {
  const active = useSelector((s) => s.channels.active)
  const messages = useSelector((s) => s.channels.messages)
  const channelMessages = messages[active.slice(1)] || []
  // const channels = useSelector((s) => s.channels.channelsList)
  // const findChannel = (name) => channels.find((it) => it === name)
  // const activeChannel = findChannel(active)
  return (
    <div>
      {channelMessages.map(({ id, username, message, time, sender }) => {
        return (
          <div key={id} className="flex items-start mb-4">
            <div className="flex flex-col">
              <div className="flex items-end">
                <span className="font-bold text-md mr-2 font-sans">{username || sender}</span>
                <span className="text-grey-500 text-xs font-light">
                  {format(time, 'MM/dd/yyyy k:m:s')}
                </span>
              </div>
              <p className="font-light text-md text-grey-800 pt-1">
                <ReactMarkdown source={message} />
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
