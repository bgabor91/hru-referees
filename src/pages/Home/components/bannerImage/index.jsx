import React from 'react'
import img2 from 'src/assets/images/head_2022.jpg'

const BannerImage = () => {
  return (
    <div
      className="md:min-h-[250px] min-h-[100px] bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${img2})`,
      }}
    ></div>
  )
}

export default BannerImage
