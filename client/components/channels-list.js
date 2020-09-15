import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { enterToChannel } from '../redux/reducers/channels'

const ChannelList = () => {
  const channels = useSelector((s) => s.channels.channelsList)
  const active = useSelector((s) => s.channels.active)
  const dispatch = useDispatch()
  return (
    <div className="mb-6 py-1 px-4 text-white font-semi-bold">
      {Object.keys(channels).map((channel) => {
        return (
          <div
            key={channel.name}
            className={`cursor-pointer ${active === channels[channel].name ? 'bg-teal-600' : ''}`}
          >
            <span className="pr-1 text-grey-300">#</span>
            <button
              type="button"
              onClick={() => {
                dispatch(enterToChannel(channels[channel].name))
              }}
            >
              {channels[channel].name}
            </button>
          </div>
        )
      })}
    </div>
  )
}
// bg-teal-600
ChannelList.propTypes = {}

export default ChannelList
