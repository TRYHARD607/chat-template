import React from 'react'

const ShowMessages = () => {
  return (
    <div>
      <div className="flex items-start mb-4">
        <img
          alt="ssss"
          src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
          className="w-10 h-10 rounded mr-3"
        />
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="font-bold text-md mr-2 font-sans">killgt</span>
            <span className="text-grey-500 text-xs font-light">11:46</span>
          </div>
          <p className="font-light text-md text-grey-800 pt-1">The slack from the other side.</p>
        </div>
      </div>
      <div className="flex items-start">
        <img alt="ssss" src="https://i.imgur.com/qACoKgY.jpg" className="w-10 h-10 rounded mr-3" />
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="font-bold text-md mr-2 font-sans">Adam Bishop</span>
            <span className="text-grey-500 text-xs font-light">12:46</span>
          </div>
          <p className="font-light text-md text-grey-800 pt-1">
            <a href="#" className="text-blue">
              @Olivia Dunham
            </a>{' '}
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it&apos;s too late!
          </p>
        </div>
      </div>
    </div>
  )
}

ShowMessages.propTypes = {}

export default ShowMessages
