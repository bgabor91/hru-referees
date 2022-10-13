import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const { user } = UserAuth()

  return (
    <div className="my-1">
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <Link
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          to="/merkozesek"
        >
          Mérkőzések
        </Link>
      </div>
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <Link
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          to="/esemenyek"
        >
          Események
        </Link>
      </div>
      <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
        <Link
          className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
          to="/jatekvezetok"
        >
          Játékvezetők
        </Link>
      </div>
      {user && (
        <>
          <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
            <Link
              className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
              to="/jv-elerhetoseg"
            >
              Jv elérhetőség
            </Link>
          </div>
          <div className="w-full mb-1 px-4 md:px-0 md:pr-1 text-center">
            <Link
              className="w-full inline-flex justify-center py-3 border border-transparent text-white hover:bg-sky-600 bg-sky-700 shadow-sm text-sm font-medium rounded-md"
              to="/profil"
            >
              Profil
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default SideMenu
