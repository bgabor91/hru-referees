import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'

const NameLogo = () => {
  const { user, userData } = UserAuth()
  const [initials, setInitials] = useState('')
  const isUserData = userData

  const createInitials = () => {
    if (user) {
      const userName = userData.displayName
      const first = userName?.slice(0, 1)
      const searchSecond = userName?.search(' ')
      const second = userName?.slice(searchSecond + 1, searchSecond + 2)
      setInitials(first?.concat('', second))
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
