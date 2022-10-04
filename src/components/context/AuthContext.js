import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
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
} from 'firebase/firestore'
import { auth, db } from '../../firebase-config'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    club: '',
    city: '',
    role: '',
  })
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    if (!email || !password) return
    return createUserWithEmailAndPassword(auth, email, password)
  }

  /*****Users API *******/

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setUserData({
        displayName: data.displayName,
        email: data.email,
        club: data.club,
        city: data.city,
        role: data.role,
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      //alert('An error occured while fetching user data')
    }
  }

  const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
      const { displayName, email, uid } = userAuth
      const createdAt = new Date()

      try {
        await setDoc(userDocRef, {
          uid: userAuth.uid,
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        })
        await fetchUserData()
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }
    return userDocRef
  }

  const addNewProfileData = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (userSnapshot.exists()) {
      const { displayName, club, city, uid } = userAuth

      try {
        await updateDoc(userDocRef, {
          uid: userAuth.uid,
          displayName,
          club,
          city,
          ...additionalInformation,
        })
        fetchUserData()
      } catch (error) {
        console.log('error adding new data to the user', error.message)
      }
    }
    return userDocRef
  }

  const getAllUsers = async () => {
    let list = []
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, ' => ', doc.data())
      list.push({ id: doc.id, ...doc.data() })
    })
    return list
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    setUserData({})
    return signOut(auth)
  }

  /***** Calendars APIs */

  const createNewRefAvailabilityCalendar = async (eventName, matchDays) => {
    const calendarDocRef = doc(db, 'calendars', eventName)
    const createdAt = new Date()

    try {
      await setDoc(calendarDocRef, {
        eventName: eventName,
        matchDays: matchDays,
        createdAt: createdAt,
      })
    } catch (error) {
      console.log('error creating the calendar', error.message)
    }
    return calendarDocRef
  }

  const addUserSelections = async (
    userAuth,
    eventName,
    selected,
    displayName
  ) => {
    let removeList = []

    if (!userAuth) return

    const calendarDocRef = doc(db, 'calendars', eventName)
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

  const getCalendar = async (eventName) => {
    let calendar = {}
    try {
      const calendarDocRef = doc(db, 'calendars', eventName)
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

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscibe()
    }
  }, [])

  useEffect(() => {
    if (!user) return
    fetchUserData()
  }, [user])

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        userData,
        loading,
        fetchUserData,
        logout,
        signIn,
        createUserDocumentFromAuth,
        getAllUsers,
        addNewProfileData,
        createNewRefAvailabilityCalendar,
        getCalendars,
        addUserSelections,
        getCalendar,
        removeCalendar,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
