import React from 'react'


import Sidebar from './sidebar'
import Chat from './chat-box'

const Home = () => {

  return (
    <div className="w-full border shadow">
     <div className="flex">
       <Sidebar />
       <Chat />
     </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
