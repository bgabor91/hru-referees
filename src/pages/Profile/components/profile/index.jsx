import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { UserAuth } from 'src/contexts/AuthContext'
import Spinner from 'src/components/common/spinner'
import PrimaryButton from 'src/components/common/primaryButton'

const Profile = () => {
  const { userData, loading } = UserAuth()
  const navigate = useNavigate()
  const isAdmin = userData?.role === 'admin'

  if (loading) {
    return (
      <div className="mx-auto md:px-10 mt-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mt-10 px-4 md:px-0">
      <h1 className="text-2xl text-center text-gray-600 font-bold mb-5 md:mb-10">
        Felhasználói adatok
      </h1>
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
      <hr className="mt-4 md:mt-0" />
      <div className="mt-10 px-4 py-3 text-center sm:px-6">
        <PrimaryButton
          type={'button'}
          text={'Profil szerkesztése'}
          onClick={() => navigate('/profil-szerkesztes')}
        />
      </div>
    </div>
  )
}

export default Profile
