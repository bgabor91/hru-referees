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
import { auth, db } from '../../firebase-config'

const MatchContext = createContext()

export const MatchContextProvider = ({ children }) => {
  const [matchData, setMatchData] = useState({
    home: '',
    away: '',
    type: '',
    gender: '',
    age: '',
    venue: '',
    referee: '',
    assist1: '',
    assist2: '',
    date: '',
    time: '',
  })

  const createNewMatch = async (payload) => {
    const matchDate = new Date(payload.date).getTime()
    const createdAt = new Date().getTime()
    const documentId = createdAt.toString()
    const matchDocRef = doc(db, 'matches', documentId)

    try {
      await setDoc(matchDocRef, {
        home: payload.home,
        away: payload.away,
        type: payload.type,
        gender: payload.gender,
        age: payload.age,
        venue: payload.venue,
        referee: payload.referee,
        assist1: payload.assist1,
        assist2: payload.assist2,
        date: payload.date,
        time: payload.time,
        sortingTime: matchDate,
      })
    } catch (error) {
      console.log('error creating the match', error.message)
    }
    return matchDocRef
  }

  const getAllMatches = async () => {
    let list = []
    const matchRef = collection(db, 'matches')
    const matchQuery = query(matchRef, orderBy('sortingTime', 'desc'))
    const querySnapshot = await getDocs(matchQuery)
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    return list
  }

  const removeMatch = async (documentId) => {
    await deleteDoc(doc(db, 'matches', documentId))
  }

  return (
    <MatchContext.Provider
      value={{ createNewMatch, getAllMatches, removeMatch }}
    >
      {children}
    </MatchContext.Provider>
  )
}

export const MatchCollection = () => {
  return useContext(MatchContext)
}
