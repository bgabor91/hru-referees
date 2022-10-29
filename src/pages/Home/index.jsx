import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import BannerImage from './components/bannerImage'
import Welcome from './components/welcome'
import SideMenu from './components/sideMenu'
import Content from './components/content'
import { UserAuth } from 'src/contexts/AuthContext'
import Spinner from 'src/components/common/spinner'

const codeConstants = {
  SUCCESS_REGISTRATION: 'Sikeres regisztráció',
}

const Home = () => {
  const { isSuccessRegister, setRegisterInfoToDefault, loading } = UserAuth()

  const showToastMessage = () => {
    toast.success(codeConstants.SUCCESS_REGISTRATION, {
      position: toast.POSITION.BOTTOM_CENTER,
    })
  }

  useEffect(() => {
    if (isSuccessRegister) {
      showToastMessage()
    }
    setRegisterInfoToDefault()
  })

  if (loading) {
    return (
      <div className="flex md:w-full mt-6 mx-4 md:mx-0 md:mt-10 justify-center">
        <Spinner />
      </div>
    )
  }
  return (
    <>
      <BannerImage />
      <Welcome />
      <div className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="basis-3/4">
          <Content />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
