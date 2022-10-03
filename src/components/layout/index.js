import React from 'react'
import Routes from '../../routes'

const Layout = ({ children }) => {
  return (
    <main className=" max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <Routes />
    </main>
  )
}

export default Layout
