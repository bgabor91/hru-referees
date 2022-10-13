import React from 'react'
import { NavLink } from 'react-router-dom'

const PermanentLinks = () => {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <NavLink
        className={`hover:bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium`}
        to="/merkozesek"
      >
        Mérkőzések
      </NavLink>
      <NavLink
        className={`hover:bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium`}
        to="/esemenyek"
      >
        Események
      </NavLink>
    </div>
  )
}

export default PermanentLinks
