import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'

const NameLogo = () => {
  const { user, userData } = UserAuth()
  const [initials, setInitials] = useState('')
  const isUserData = userData

  const createInitials = () => {
    if (user) {
      const userName = userData.displayName
      const firstInitial = userName?.slice(0, 1)
      const searchSecondInitial = userName?.search(' ')
      const secondInitial = userName?.slice(searchSecondInitial + 1, searchSecondInitial + 2)
      if (searchSecondInitial === -1) {
        setInitials(firstInitial.toUpperCase())
      } else {
        setInitials(firstInitial?.toUpperCase().concat('', secondInitial.toUpperCase()))
      }
    }
  }

  useEffect(() => {
    if (userData) {
      createInitials()
    }
  }, [isUserData])

  return (
    <div className="flex my-auto text-xl text-white font-bold">{initials}</div>
  )
}

export default NameLogo
