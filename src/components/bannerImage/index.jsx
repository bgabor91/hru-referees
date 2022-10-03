import React from 'react'
import img1 from '../../assets/images/jv_1.jpg'
import img2 from '../../assets/images/head_2022.jpg'

const BannerImage = () => {
  return (
    <div
      className="md:min-h-[250px] min-h-[90px] bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${img2})`,
      }}
    ></div>
  )
}

export default BannerImage
