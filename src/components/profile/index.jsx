import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Spinner from '../spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const codeConstants = {
  SUCCESS_REGISTRATION: 'Sikeres regisztráció'
}

const Profile = () => {
  const { userData, loading, isSuccessRegister, setRegisterInfoToDefault } = UserAuth()
  const isAdmin = userData?.role === 'admin'

  const showToastMessage = () => {
      toast.success(codeConstants.SUCCESS_REGISTRATION, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
  }

  useEffect(() => {
    if(isSuccessRegister) {
      showToastMessage()
    }
    setRegisterInfoToDefault()
  })

  return (
    <div className="mt-10 px-4 md:px-0">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl text-center text-gray-600 font-bold mb-5 md:mb-10">Felhasználói adatok</h1>
          <hr />
          <div className="mx-10 md:mx-36 text-gray-600">
            <div className="flex flex-col text-center md:flex-row md:justify-between mt-5">
              <p className="text-lg md:mb-5 font-semibold	">Név:</p>
              <p className="text-lg md:mb-5">{userData.displayName}</p>
            </div>
            <div className="flex flex-col text-center md:flex-row md:justify-between mt-5">
              <p className="text-lg md:mb-5 font-semibold	">Email:</p>
              <p className="text-lg md:mb-5">{userData.email}</p>
            </div>
            <div className="flex flex-col text-center md:flex-row md:justify-between mt-5">
              <p className="text-lg md:mb-5 font-semibold	">Egyesület:</p>
              <p className="text-lg md:mb-5">{userData.club}</p>
            </div>
            <div className="flex flex-col text-center md:flex-row md:justify-between mt-5">
              <p className="text-lg md:mb-5 font-semibold	">Lakhely:</p>
              <p className="text-lg md:mb-5">{userData.city}</p>
            </div>
            {isAdmin && (
              <div className="flex flex-col text-center md:flex-row md:justify-between mt-5">
                <p className="text-lg md:mb-5 font-semibold	">Szerepkör:</p>
                <p className="text-lg mb-5">{userData?.role}</p>
              </div>
            )}
          </div>
          <hr className='mt-4 md:mt-0'/>
          <div className="mt-10 px-4 py-3 text-center sm:px-6">
            <Link
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
              to="/profil-szerkesztes"
            >
              Profil szerkesztése
            </Link>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  )
}

export default Profile
