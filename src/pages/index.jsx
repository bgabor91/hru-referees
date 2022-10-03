import React from 'react'
import HeaderNavbar from '../components/navbar'
import Layout from '../components/layout'
import { AuthContextProvider } from '../components/context/AuthContext'

const View = () => {
  return (
    <AuthContextProvider>
      <HeaderNavbar />
      <Layout />
    </AuthContextProvider>
  )
}

export default View
