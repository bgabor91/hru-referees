import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from 'src/contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LinkButton from 'src/components/common/linkButton'
import PrimaryButton from 'src/components/common/primaryButton'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const codeConstants = {
  WEAK_PASSWORD: 'A jelszónak legalább 6 karakterből kell állnia',
  EMAIL_ALREADY_IN_USE: 'Ez az email már regisztrálva van',
  INVALID_EMAIL: 'Érvénytelen email cím',
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
      navigate('/')
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
            <label>Jelszó újra:</label>
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
              <PrimaryButton type={'submit'} text={'Regisztrálok'} />
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <LinkButton link={'/belepes'} text={'Van már fiókod? Lépj be!'} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </figure>
  )
}

export default Register
