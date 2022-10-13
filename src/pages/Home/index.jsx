import React from 'react'
import BannerImage from '../../components/bannerImage'
import Welcome from '../../components/welcome'
import SideMenu from '../../components/sideMenu'
import Content from '../../components/content'

const Home = () => {
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
    </>
  )
}

export default Home
