import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdLogout, MdFacebook, MdPersonOutline, MdTableView } from 'react-icons/md'
import { UserAuth } from '../../context/AuthContext'

const MobilLinks = ({ isLoggedIn, handleNav }) => {
  const { logout } = UserAuth()
  const navigate = useNavigate()

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
      {isLoggedIn ? (
        <>
          <ul className="w-full p-4">
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <a
                className=" flex items-center justify-center"
                href="https://www.facebook.com/groups/513219272190437"
                target="_blank"
                rel="noreferrer"
              >
                <MdFacebook color="white" size={24} />
                <span className="ml-2">Facebook</span>
              </a>
            </li>
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <NavLink
                to="/jv-elerhetoseg"
                className="flex items-center justify-center"
              >
                <MdTableView color="white" size={24} />
                <span className="ml-2">Játékvezető elérhetőség</span>
              </NavLink>
            </li>
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <NavLink
                to="/profil"
                className="flex items-center justify-center"
              >
                <MdPersonOutline color="white" size={24} />
                <span className="ml-2">Profilom</span>
              </NavLink>
            </li>
            <li
              onClick={handleNav}
              className="border-b py-6 text-white px-3 text-center text-sm font-medium"
            >
              <div
                onClick={handleLogout}
                className="flex items-center justify-center"
              >
                <MdLogout color="white" size={24} />
                <span className="ml-2">Kijelentkezés</span>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <div className="flex flex-col w-full p-4">
          <NavLink to="/belepes">
            <button
              onClick={handleNav}
              className="w-full my-2 p-3 bg-primary text-white border border-secondary rounded-2xl shadow-xl"
            >
              Bejelentkezés
            </button>
          </NavLink>
          <NavLink to="/regisztracio">
            <button
              onClick={handleNav}
              className="bg-white w-full my-2 p-3 bg-button text-red-500 rounded-2xl shadow-xl"
            >
              Regisztráció
            </button>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default MobilLinks
