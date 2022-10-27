import { useState, useEffect } from 'react'
import { MatchCollection } from 'src/contexts/MatchContext'

const useAllMatches = () => {
  const { getAllMatches } = MatchCollection()
  const [allMatches, setAllMatches] = useState([])

  const fetchAllMatches = async () => {
    const response = await getAllMatches()
    setAllMatches(response)
  }

  useEffect(() => {
    fetchAllMatches()
  }, [getAllMatches])

  return { allMatches, fetchAllMatches }
}

export default useAllMatches
