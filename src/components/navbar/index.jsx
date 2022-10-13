import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { UserAuth } from '../context/AuthContext'
import SignedInLinks from '../navLinks/signedInLinks'
import SignedOutLinks from '../navLinks/signedOutLinks'
import PermanentLinks from '../navLinks/permanentLinks'
import MobilLinks from '../navLinks/mobilLinks'
import NavBarLogo from '../navbarLogo'
import LogoText from '../navbarLogo/logoText'

const HeaderNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, userData } = UserAuth()
  const isLoggedIn = user
  const isUserData = userData

  const handleNav = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="min-h-full">
      <div
        className='bg-red-500 shadow-xl'
      >
        <div className=" max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NavBarLogo />
              </div>
            </div>
            <div className="block md:hidden">
              <LogoText />
            </div>
            <div className="hidden md:block items-center">
              <PermanentLinks />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-middle space-x-4">
                {isLoggedIn && isUserData && <SignedInLinks />}
                {!isLoggedIn && <SignedOutLinks />}
              </div>
            </div>
            <div
              onClick={handleNav}
              className="ml-6 block md:hidden cursor-pointer z-10"
            >
              {isOpen ? (
                <AiOutlineClose color="white" size={24} />
              ) : (
                <AiOutlineMenu color="white" size={24} />
              )}
            </div>
          </div>
        </div>

        <div
          className={
            isOpen
              ? 'md:hidden bg-red-500 fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] ease-in duration-300 z-50'
              : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between '
          }
        >
          <ul className="w-full p-4">
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <NavLink to="/merkozesek">Mérkőzések</NavLink>
            </li>
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <NavLink to="/esemenyek">Események</NavLink>
            </li>
          </ul>
          <MobilLinks isLoggedIn={isLoggedIn} handleNav={handleNav} />
        </div>
      </div>
    </nav>
  )
}

export default HeaderNavbar
