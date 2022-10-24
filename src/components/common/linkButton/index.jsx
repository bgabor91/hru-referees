import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({ text, link }) => {
  return (
    <div>
      <button
        type="button"
        className="justify-center text-blue-500 hover:underline"
      >
        <Link to={link}>{text}</Link>
      </button>
    </div>
  )
}

export default LinkButton
