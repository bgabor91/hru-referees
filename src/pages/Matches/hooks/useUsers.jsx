import {useEffect, useState} from 'react'
import { UserAuth } from 'src/contexts/AuthContext'

const useUsers = () => {
  const { getAllUsers } = UserAuth()
  const [allUsers, setAllUsers] = useState([])

  const fetchUsers = async () => {
    const response = await getAllUsers()
    setAllUsers(response)
  }

  useEffect(() => {
    fetchUsers()
  }, [getAllUsers])

  return { allUsers, fetchUsers }
}

export default useUsers
