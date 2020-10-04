import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { enterToChannel } from '../redux/reducers/channels'

const ChannelList = () => {
  const channels = useSelector((s) => s.channels.channelsList)
  const active = useSelector((s) => s.channels.active)
  const dispatch = useDispatch()
  return (
    <div className="mb-6 py-1 px-4 text-white font-semi-bold">
      {channels.map(({ name }) => {
        return (
          <div
            key={name}
            className={`cursor-pointer ${active.slice(1) === name ? 'bg-teal-600' : ''}`}
          >
            <span className="pr-1 text-grey-300">#</span>
            <button
              className="w-11/12 text-left focus:outline-none"
              type="button"
              onClick={() => {
                dispatch(enterToChannel(`#${name}`))
              }}
            >
              {name}
            </button>
          </div>
        )
      })}
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
