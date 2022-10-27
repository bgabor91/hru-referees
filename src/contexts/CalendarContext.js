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
  const createNewRefAvailabilityCalendar = async (eventName, matchDays) => {
    const doc_id = eventName.toLowerCase()
    const calendarDocRef = doc(db, 'calendars', doc_id)
    const createdAt = new Date()

    try {
      await setDoc(calendarDocRef, {
        eventName: eventName,
        matchDays: matchDays,
        createdAt: createdAt,
        userSelections: [],
      })
    } catch (error) {
      console.log('error creating the calendar', error.message)
    }
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
    return calendarDocRef
  }

  const getCalendars = async () => {
    let list = []
    const querySnapshot = await getDocs(collection(db, 'calendars'))
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() })
    })
    return list
  }

  const getCalendar = async (doc_id) => {
    let calendar = {}
    try {
      const calendarDocRef = doc(db, 'calendars', doc_id)
      const querySnapshot = await getDoc(calendarDocRef)
      calendar = querySnapshot.data()
    } catch (err) {
      console.error(err)
      //alert('An error occured while fetching user data')
    }
    return calendar
  }

  const removeCalendar = async (eventName) => {
    await deleteDoc(doc(db, 'calendars', eventName))
  }

  return (
    <CalendarContext.Provider
      value={{
        createNewRefAvailabilityCalendar,
        addUserSelections,
        getCalendars,
        getCalendar,
        removeCalendar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const CalendarCollection = () => {
  return useContext(CalendarContext)
}
