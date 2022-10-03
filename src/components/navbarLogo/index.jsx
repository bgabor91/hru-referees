import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoImage from './logoImage'
import LogoText from './logoText'

const NavBarLogo = () => {
  return (
    <div>
      <NavLink to="/" className="flex">
        <LogoImage />
        <div className="flex items-center">
          <div className="hidden md:block">
            <LogoText />
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default NavBarLogo
