import React from 'react'

const ChatHeader = () => {
  return (
    <div className="border-b flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-grey-800 text-md mb-1 font-extrabold">#general</h3>
        <div className="text-grey-500 font-thin text-sm">
          Chit-chattin&#39 about ugly HTML and mixing of concerns.
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <input type="search" placeholder="Search" className="border border-grey-500 rounded-lg p-2" />
      </div>
    </div>
  )
}

ChatHeader.propTypes = {}

export default ChatHeader
