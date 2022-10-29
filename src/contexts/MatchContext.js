import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  orderBy,
} from 'firebase/firestore'
import { auth, db } from 'src/firebase-config'

const MatchContext = createContext()

export const MatchContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [matchData, setMatchData] = useState({})

  const createNewMatch = async (payload) => {
    const matchDate = new Date(payload.date).getTime()
    const createdAt = new Date().getTime()
    const documentId = createdAt.toString()
    const matchDocRef = doc(db, 'matches', documentId)
    console.log(payload)
    setMatchData({
      home: payload.home,
      away: payload.away,
      type: payload.type,
      gender: payload.gender,
      age: payload.age,
      venue: payload.venue,
      referee: payload.referee,
      referees: payload.referees,
      assist1: payload.assist1,
      assist2: payload.assist2,
      date: payload.date,
      time: payload.time,
      sortingTime: matchDate,
    })

    try {
      setLoading(true)
      await setDoc(matchDocRef, {
        home: payload.home,
        away: payload.away,
        type: payload.type,
        gender: payload.gender,
        age: payload.age,
        venue: payload.venue,
        referee: payload.referee,
        referees: payload.referees,
        assist1: payload.assist1,
        assist2: payload.assist2,
        date: payload.date,
        time: payload.time,
        sortingTime: matchDate,
      })
    } catch (error) {
      console.log('error creating the match', error.message)
    }
    setLoading(false)
    return matchDocRef
  }

  const getAllMatches = async () => {
    let list = []
    setLoading(true)
    const matchRef = collection(db, 'matches')
    const matchQuery = query(matchRef, orderBy('sortingTime', 'desc'))
    const querySnapshot = await getDocs(matchQuery)
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    setLoading(false)
    return list
  }

  const getSingleMatch = async (documentId) => {
    setLoading(true)
    let match = {}
    try {
      const matchDocRef = doc(db, 'matches', documentId)
      const querySnapshot = await getDoc(matchDocRef)
      match = querySnapshot.data()
    } catch (err) {
      console.error(err)
      //alert('An error occured while fetching user data')
    }
    setLoading(false)
    return match
  }

  const removeMatch = async (documentId) => {
    setLoading(true)
    await deleteDoc(doc(db, 'matches', documentId))
    setLoading(false)
  }

  useEffect(() => {
    getAllMatches()
  }, [matchData])

  return (
    <MatchContext.Provider
      value={{
        createNewMatch,
        getAllMatches,
        removeMatch,
        getSingleMatch,
        loading,
      }}
    >
      {children}
    </MatchContext.Provider>
  )
}

export const MatchCollection = () => {
  return useContext(MatchContext)
}
