import React from 'react'

const PrimaryButton = ({ text, type, onClick }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="inline-flex justify-center mb-2 py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
      >
        {text}
      </button>
    </div>
  )
}

export default PrimaryButton
