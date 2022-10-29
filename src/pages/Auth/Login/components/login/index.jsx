import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from 'src/contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LinkButton from 'src/components/common/linkButton'
import PrimaryButton from 'src/components/common/primaryButton'

const defaultFormFields = {
  email: '',
  password: '',
}

const codeConstants = {
  USER_NOT_FOUND:
    'Rossz jelszót vagy email címet adtál meg, vagy a felhasználó nem létezik',
  WRONG_PASSWORD: 'Rossz jelszó',
}

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const { signIn } = UserAuth()
  const navigate = useNavigate()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password)
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
    if (message === 'auth/user-not-found') {
      toast.error(codeConstants.USER_NOT_FOUND, {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
    if (message === 'auth/wrong-password') {
      toast.error(codeConstants.WRONG_PASSWORD, {
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
              <PrimaryButton type={'submit'} text={'Belépés'} />
            </div>
          </form>
          <div className="flex items-center mt-3 justify-center">
            <LinkButton
              link={'/regisztracio'}
              text={'Nincs még fiókod? Készítsd el!'}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </figure>
  )
}

export default Login
