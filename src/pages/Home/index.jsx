import React from 'react'
import BannerImage from '../../components/bannerImage'
import Welcome from '../../components/welcome'

const Home = () => {

  return (
    <>
      <BannerImage />
      <Welcome />
      <div className='flex flex-col md:flex-row mt-2 md:mt-5'>
        <div className='basis-1/4'>
          <p className='text-lg text-semibold'>Menü hamarosan...</p>
        </div>
        <div className='basis-3/4'>
          <p className='text-lg text-semibold'>Tartalom hamarosan...</p>
        </div>
      </div>
    </>
  )
}

export default Home
