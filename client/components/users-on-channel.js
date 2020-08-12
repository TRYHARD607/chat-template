import React from 'react'

const UsersOnChannel = () => {

  return (
    <div>
      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">
          Olivia Dunham <i className="text-grey-500 text-sm">(me)</i>
        </span>
      </div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">Adam Bishop</span>
      </div>

      <div className="flex items-center px-4 mb-6">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">killgt</span>
      </div>
    </div>
  )
}

UsersOnChannel.propTypes = {}

export default UsersOnChannel
