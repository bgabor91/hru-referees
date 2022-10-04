import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Welcome = () => {
  const { user, userData } = UserAuth()
  const userName = userData.displayName || 'Kedves látogató'
  const loggedIn = user

  return (
    <div className="flex flex-col md:flex-row md:w-full mt-5 md:mt-2 py-2 text-center">
      <h2 className="text-lg font-semibold mt-2 md:mt-0">Szia {userName}!
      </h2>
      {!loggedIn && (
        <>
          <p className="text-lg md:ml-2">Ha van már fiókod, jelentkezz be</p>
          <button className="justify-center text-blue-500 hover:underline">
            <Link to="/belepes">
              <p className="text-lg md:ml-2">itt,</p>
            </Link>
          </button>
          <p className="text-lg md:ml-2">vagy hozz létre egyett</p>
          <button className="justify-center text-blue-500 hover:underline">
            <Link to="/regisztracio">
              <p className="text-lg md:ml-2">itt!</p>
            </Link>
          </button>
        </>
      )}
    </div>
  )
}

export default Welcome
