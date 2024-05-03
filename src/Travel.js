import React from 'react'

const Travel = ({distance, duration}) => {
  return (
    <div className="container info">
        <div className="firstInfo">
          <p>Nyabugogo - Kimironko </p>
        </div >
        <div>
          <p>Next stop: Kacyiru Bus park </p>
        </div>
        <div className="lastInfo">
          <p>Distance: {distance}</p>
          <p>Time: {duration}</p>
        </div>
      </div>
  )
}

export default Travel