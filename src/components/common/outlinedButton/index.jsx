import React from 'react'

const OutlinedButton = ({ text, onClick, type }) => {
  return (
    <>
      <button
        type={type}
        className="inline-flex justify-center py-2 px-4 border text-md border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 shadow-sm font-medium rounded-md"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export default OutlinedButton
