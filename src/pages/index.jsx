import React from 'react'

import HeaderNavbar from '../components/navbar'
import Layout from '../components/layout'
import Footer from '../components/footer'
import { AuthContextProvider } from 'src/contexts/AuthContext'
import { MatchContextProvider } from 'src/contexts/MatchContext'

const View = () => {
  return (
    <AuthContextProvider>
      <MatchContextProvider>
        <div className="flex flex-col min-h-screen">
          <HeaderNavbar />
          <div className="flex-grow">
            <Layout />
          </div>
          <Footer />
        </div>
      </MatchContextProvider>
    </AuthContextProvider>
  )
}

export default View
