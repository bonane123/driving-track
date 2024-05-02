import React from 'react'
import { IoIosNotificationsOutline, IoMdHeartEmpty } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'

function Footer() {
  return (
    <footer className='container footer'>
    <IoMdHeartEmpty />
    <PiWarningCircle />
    <IoIosNotificationsOutline />
  </footer>
  )
}

export default Footer