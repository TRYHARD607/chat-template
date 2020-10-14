import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

const ChatHeader = () => {
  const active = useSelector((s) => s.channels.active)
  const cookies = new Cookies()

  return (
    <div className="border-b flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-grey-800 text-md mb-1 font-extrabold">{active}</h3>
      </div>
      <div className="ml-auto hidden md:block">
        <input
          type="search"
          placeholder="Search"
          className="border border-grey-500 rounded-lg p-2"
        />
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-6 focus:outline-none"
        onClick={() => {
          cookies.remove('token', { path: '/' })
        }}
      >
        <Link to="/auth">Log Out</Link>
      </button>
    </div>
  )
}

ChatHeader.propTypes = {}

export default ChatHeader
