import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const codeConstants = {
  WEAK_PASSWORD: 'A jelszónak legalább 6 karakterből kell állnia',
  EMAIL_ALREADY_IN_USE: 'Ez az email már regisztrálva van',
  INVALID_EMAIL: 'Érvénytelen email cím'
}

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const { createUser, createUserDocumentFromAuth } = UserAuth()
  const navigate = useNavigate()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const { user } = await createUser(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
      navigate('/profil')
    } catch (e) {
      console.error(e.message)
      showToastMessage(e.code)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const showToastMessage = (message) => {
    if (message === 'auth/weak-password') {
      console.log(message)
      toast.error(codeConstants.WEAK_PASSWORD, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } else if (message === 'auth/email-already-in-use') {
      toast.error(codeConstants.EMAIL_ALREADY_IN_USE, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    } else if (message === 'auth/invalid-email') {
      toast.error(codeConstants.EMAIL_ALREADY_IN_USE, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
  }

  return (
    <figure className="h-screen flex bg-gray-100">
      <div className="w-full max-w-md md:m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
        <div className="text-primary m-6">
          <div className="flex items-center mt-3 justify-center">
            <h1 className="text-2xl font-medium text-primary mt-2 mb-2">
              Regisztráció
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-left">Név:</label>
            <input
              name="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => handleChange(e)}
              placeholder="Név"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            />
            <label className="text-left">Email:</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => handleChange(e)}
              placeholder="Email"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            />
            <label className="text-left">Jelszó:</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => handleChange(e)}
              placeholder="Jelszó"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            />
            <label>Jelszó újrsa:</label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
              placeholder="Jelszó újra"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className="bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                value="Login"
              >
                Regisztrálok
              </button>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <button className="justify-center text-blue-500 hover:underline">
              <Link to="/belepes">Van már fiókod? Lépj be!</Link>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </figure>
  )
}

export default Register
