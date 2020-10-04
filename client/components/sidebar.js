import React from 'react'
import { useSelector } from 'react-redux'

import AliveUsers from './alive-users'
import ChannelList from './channels-list'
import AddChannel from './add-channel'

const Sidebar = () => {
  const user = useSelector((s) => s.auth.user)
  return (
    <div className="bg-purple-900 text-purple-100 w-1/5 pb-6 hidden md:block">
      <h1 className="text-white text-xl mb-2 mt-3 px-4 font-sans flex justify-between font-bold">
        <span>Party chat</span>
      </h1>
      <div className="flex items-center mb-6 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">{user.username}</span>
      </div>
      <div className="px-4 mb-2 font-sans text-purple-300">Channels</div>
      <ChannelList />
      <div className="px-4 mb-3 font-sans text-purple-300">Direct Messages</div>
      <AliveUsers />
      <div className="px-4 mb-3 font-sans text-purple-300">Applications</div>
      <AddChannel />
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
