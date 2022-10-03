import React from 'react'
import { UserAuth } from '../../components/context/AuthContext'
import BannerImage from '../../components/bannerImage'

const Home = () => {
  const {user} = UserAuth()

  return (
    <>
      <BannerImage />
      <h1>Szia {user?.email}</h1>
    </>
  )
}

export default Home
