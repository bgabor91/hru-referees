import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useWindowWidth } from '@react-hook/window-size'
import { MdLogout, MdFacebook, MdPersonOutline, MdTableView } from 'react-icons/md'
import NameLogo from '../../nameLogo'
import { UserAuth } from '../../context/AuthContext'

const SignedInLinks = ({ ref }) => {
  const { logout, userData } = UserAuth()
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isBlock = width < 768 ? 'block' : ''

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <a
        className={`hover:bg-red-400 text-white ${isBlock} px-1 py-2 rounded-md text-sm font-medium`}
        href="https://www.facebook.com/groups/513219272190437"
        target="_blank"
        rel='noreferrer'
      >
        <MdFacebook color="white" size={24} />
      </a>
      <NavLink
        className={`hover:bg-red-400 text-white ${isBlock} px-1 py-2 rounded-md text-sm font-medium`}
        to="/jv-elerhetoseg"
      >
        <MdTableView color="white" size={24} />
      </NavLink>
      <NavLink
        className={`hover:bg-red-400 text-white ${isBlock} px-1 py-2 rounded-md text-sm font-medium`}
        to="/profil"
      >
        <MdPersonOutline color="white" size={24} />
      </NavLink>
      <NavLink
        className={`hover:bg-red-400 text-white ${isBlock} px-1 py-2 rounded-md text-sm font-medium`}
        to="/"
        onClick={handleLogout}
      >
        <MdLogout color="white" size={24} />
      </NavLink>
      {userData ? <NameLogo /> : ''}
    </>
  )
}

export default SignedInLinks
