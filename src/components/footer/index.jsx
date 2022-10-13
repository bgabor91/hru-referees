import React from 'react'

const Footer = () => {
  return (
    <footer className="p-4 md:py-6 bg-[#232629] text-gray-400">
      <div className="flex flex-col md:flex-row md:justify-center text-center">
        <h6 className='text-sm font-semibold'>Magyar Rögbi Szövetség</h6>
        <div className='hidden md:inline-block md:mx-2'>-</div>
        <h6 className='text-sm'>Játékvezetői Bizottság</h6>
      </div>
    </footer>
  )
}

export default Footer
