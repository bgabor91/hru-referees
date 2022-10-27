import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from 'src/contexts/AuthContext'
import Spinner from 'src/components/common/spinner'
import OutlinedButton from 'src/components/common/outlinedButton'
import PrimaryButton from 'src/components/common/primaryButton'
import DisabledButton from 'src/components/common/disabledButton'

const defaultFormFields = {
  displayName: '',
  email: '',
  club: '',
  city: '',
}

const ProfileEdit = () => {
  const { user, userData, addNewProfileData, fetchUserData } =
    UserAuth()
  const [edited, setEdited] = useState(false)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, club, city } = formFields
  const navigate = useNavigate()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  useEffect(() => {
    if (!user) return
    fetchUserData()
    setFormFields({
      displayName: userData.displayName,
      email: userData.email,
      club: userData.club,
      city: userData.city,
    })
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addNewProfileData(user, { displayName, club, city })
      resetFormFields()
      navigate('/profil')
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
    setEdited(true)
  }

  return (
    <div className="mx-auto md:px-10 mt-10">
      {!displayName ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl text-center text-gray-500 font-bold md:mb-10">
            Profil szerkesztése
          </h1>
          {!displayName && (
            <p className="mb-5 text-sm text-center text-red-600">
              Kérlek, add meg a hiányzó információkat!
            </p>
          )}

          <div className="mt-5 px-4 md:px-0 md:mx-36 md:mt-0 bg-white text-gray-500">
            <form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Név
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={displayName}
                        id="name"
                        autoComplete="name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        value={email}
                        disabled
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="club"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Klub/egyesület
                      </label>
                      <select
                        id="club"
                        name="club"
                        autoComplete="club"
                        value={club}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      >
                        <option
                          selected
                          disabled={true}
                          value="Válassz egyesületet"
                        >
                          --Válassz egyesületet--
                        </option>
                        <option>Esztergom</option>
                        <option>Bulldogok</option>
                        <option>Szeged</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Város/Lakóhely
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        autoComplete="city"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 md:mt-10 px-4 py-3 text-center sm:px-6">
                  {edited ? (
                    <PrimaryButton type={'submit'} text={'Mentem a módosításokat'} />
                  ) : (
                    <DisabledButton text={'Mentem a módosításokat'}/>
                  )}
                </div>
                <div className="mb-5 md:mb-10 px-4 py-3 text-center sm:px-6">
                  <OutlinedButton
                    type={'button'}
                    text={'Vissza a profilra'}
                    onClick={() => navigate('/profil')}
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileEdit
