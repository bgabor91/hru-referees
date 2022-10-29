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
import { db } from 'src/firebase-config'

const CalendarContext = createContext()

export const CalendarContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const createNewRefAvailabilityCalendar = async (eventName, matchDays) => {
    const doc_id = eventName.toLowerCase()
    const calendarDocRef = doc(db, 'calendars', doc_id)
    const createdAt = new Date()

    try {
      setLoading(true)
      await setDoc(
        calendarDocRef,
        {
          eventName: eventName,
          matchDays: matchDays,
          createdAt: createdAt,
          userSelections: [],
        },
        { merge: true }
      )
    } catch (error) {
      console.log('error creating the calendar', error.message)
    }
    setLoading(false)
    return calendarDocRef
  }

  const addUserSelections = async (
    userAuth,
    document_id,
    selected,
    displayName
  ) => {
    let removeList = []
    if (!userAuth) return

    const calendarDocRef = doc(db, 'calendars', document_id)
    const querySnapshot = await getDoc(calendarDocRef)

    if (querySnapshot.data().userSelections) {
      let userSelectionList = querySnapshot.data().userSelections

      userSelectionList.map((doc) => {
        if (doc.uid === userAuth.uid) {
          removeList.push(doc)
        }
        return removeList
      })
    }

    try {
      setLoading(true)
      if (removeList.length > 0) {
        await updateDoc(calendarDocRef, {
          userSelections: arrayRemove(removeList[0]),
        })
        await updateDoc(calendarDocRef, {
          userSelections: arrayUnion({
            uid: userAuth.uid,
            displayName: displayName,
            selected: selected,
          }),
        })
      } else {
        await updateDoc(calendarDocRef, {
          userSelections: arrayUnion({
            uid: userAuth.uid,
            displayName: displayName,
            selected: selected,
          }),
        })
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    return calendarDocRef
  }

  const getCalendars = async () => {
    let list = []
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, 'calendars'))
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    setLoading(false)
    return list
  }

  const getCalendar = async (doc_id) => {
    let calendar = {}
    setLoading(true)
    try {
      const calendarDocRef = doc(db, 'calendars', doc_id)
      const querySnapshot = await getDoc(calendarDocRef)
      calendar = querySnapshot.data()
    } catch (err) {
      console.error(err)
      //alert('An error occured while fetching user data')
    }
    setLoading(false)
    return calendar
  }

  const removeCalendar = async (eventName) => {
    setLoading(true)
    await deleteDoc(doc(db, 'calendars', eventName))
    setLoading(false)
  }

  return (
    <CalendarContext.Provider
      value={{
        createNewRefAvailabilityCalendar,
        addUserSelections,
        getCalendars,
        getCalendar,
        removeCalendar,
        loading,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const CalendarCollection = () => {
  return useContext(CalendarContext)
}
