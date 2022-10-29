import { useState, useEffect } from 'react'
import { MatchCollection } from 'src/contexts/MatchContext'

const useAllMatches = () => {
  const { getAllMatches, loading } = MatchCollection()
  const [allMatches, setAllMatches] = useState([])

  const fetchAllMatches = async () => {
    const response = await getAllMatches()
    setAllMatches(response)
  }

  useEffect(() => {
    fetchAllMatches()
  }, [])

  return { allMatches, fetchAllMatches, loading }
}

export default useAllMatches
