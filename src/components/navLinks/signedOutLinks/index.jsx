import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdLogin, MdAddCircle, MdFacebook } from 'react-icons/md'
import { useWindowWidth } from '@react-hook/window-size'

const SignedOutLinks = () => {
  const width = useWindowWidth()
  const isBlock = width < 768 ? 'block' : ''

  return (
    <>
      <a
        className={`hover:bg-red-400 text-white ${isBlock} px-2 py-2 rounded-md text-sm font-medium`}
        href="https://www.facebook.com/groups/513219272190437"
        target="_blank"
        rel="noreferrer"
      >
        <MdFacebook color="white" size={24} />
      </a>
      <NavLink
        className={`hover:bg-red-400 text-white ${isBlock} px-2 py-2 rounded-md text-sm font-medium`}
        to="/belepes"
      >
        <MdLogin color="white" size={24} />
      </NavLink>
      <NavLink
        className={`hover:bg-red-400 text-white ${isBlock} px-2 py-2 rounded-md text-sm font-medium`}
        to="/regisztracio"
      >
        <MdAddCircle color="white" size={24} />
      </NavLink>
    </>
  )
}

export default SignedOutLinks
