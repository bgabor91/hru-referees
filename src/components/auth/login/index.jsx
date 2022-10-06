import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultFormFields = {
  email: '',
  password: '',
}

const codeConstants = {
  USER_NOT_FOUND: 'Rossz jelszót vagy email címet adtál meg, vagy a felhasználó nem létezik',
}

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const [error, setError] = useState('')
  const { signIn } = UserAuth()
  const navigate = useNavigate()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      resetFormFields()
      navigate('/')
    } catch (e) {
      setError(e.message)
      console.error(error)
      showToastMessage(e.code)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const showToastMessage = (message) => {
    if (message === 'auth/user-not-found') {
      console.log(message)
      toast.error(codeConstants.USER_NOT_FOUND, {
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
              Belépés a fiókomba
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
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
            <label>Jelszó:</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => handleChange(e)}
              placeholder="Jelszó"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            />
            <div className="flex items-center mt-3 justify-center">
              <button
                className="bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                value="Login"
              >
                Belépés
              </button>
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <button className="justify-center text-blue-500 hover:underline">
              <Link to="/regisztracio">Nincs még fiókod? Készítsd el!</Link>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </figure>
  )
}

export default Login
