import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewChannel } from '../redux/reducers/channels'

const AddChannel = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  return (
    <div className="flex juctify-center flex-col">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="my-2 mx-2 text-black px-2 py-2"
      />
      <button
        type="button"
        className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch(addNewChannel(name))
          setName('')
        }}
      >
        Add Channel
      </button>
    </div>
  )
}

AddChannel.propTypes = {}

export default AddChannel
