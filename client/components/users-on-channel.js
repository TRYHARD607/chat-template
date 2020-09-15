import React from 'react'
import { useSelector } from 'react-redux'

const UsersOnChannel = () => {
  const name = useSelector((s) => s.users.name)
  return (
    <div>
      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">
          {name} <i className="text-grey-500 text-sm">(me)</i>
        </span>
      </div>
    </div>
  )
}

UsersOnChannel.propTypes = {}

export default UsersOnChannel
