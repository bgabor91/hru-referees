import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from 'src/contexts/AuthContext'

const Welcome = () => {
  const { user, userData } = UserAuth()
  const loggedIn = userData
  const userName = userData?.displayName

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap md:w-full border rounded border-gray-300 md:hover:border-gray-500/50 mt-2 mx-4 md:mx-0 md:mt-5 md:px-5 py-2 text-center lg:content-center">
      {user ? (
        <>
          <h2 className="text-sm font-semibold md:mt-0 text-gray-600 md:leading-7">
            Üdvözöllek {userName}!
          </h2>
          <p className="text-sm md:ml-2 md:mb-0 md:mt-0 text-gray-600 md:leading-7">
            A szerkesztéshez, kérlek válassz a menüsorból!
          </p>
        </>
      ) : (
        <>
          <h2 className="text-sm font-bold text-gray-600 md:leading-7">
            Üdvözöllek az MRGSZ Játékvezetői Bizottság oldalán!
          </h2>
          <p className="text-sm font-semibold md:ml-2 text-gray-600 md:leading-7">
            Válassz a következő lehetőségek közül!
          </p>
          <div className="flex justify-around ">
            <div className="py-2 md:py-0 md:px-2 text-center">
              <Link
                className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
                to="/belepes"
              >
                Belépés
              </Link>
            </div>
            <div className="py-2 md:py-0 md:px-2 text-center">
              <Link
                className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
                to="/regisztracio"
              >
                Regisztráció
              </Link>
            </div>
          </div>
        </>
      )}

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
