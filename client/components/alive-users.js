import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { enterToChannel } from '../redux/reducers/channels'

const AliveUsers = () => {
  const users = useSelector((s) => s.channels.users)
  const me = useSelector((s) => s.auth.user.username)
  const active = useSelector((s) => s.channels.active)
  const dispatch = useDispatch()
  return (
    <div>
      {users.map((it) => {
        if (me === it)
          return (
            <div key={it} className="flex items-center mb-3 px-4">
              <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
              <span className="text-purple-100">
                {it} <i className="text-grey-500 text-sm">(me)</i>
              </span>
            </div>
          )
        return (
          <button
            type="button"
            key={it}
            className={`w-full flex items-center mb-3 px-4 ${
              active.slice(1) === it ? 'bg-teal-600' : ''
            }`}
            onClick={() => {
              dispatch(enterToChannel(`@${it}`))
            }}
          >
            <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
            <span className="text-purple-100">{it}</span>
          </button>
        )
      })}
    </div>
  )
}

AliveUsers.propTypes = {}

export default AliveUsers
