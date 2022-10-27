import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
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
  addDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore'
import { auth, db } from 'src/firebase-config'

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
  const [isSuccessRegister, setIsSuccessRegister] = useState(false)

  const createUser = (email, password) => {
    if (!email || !password) return
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const fetchUserData = useCallback(async () => {
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
  })

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
          role: 'user',
          ...additionalInformation,
        })
        await fetchUserData()
        setIsSuccessRegister(true)
      } catch (error) {
        console.error('error creating the user', error.message)
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

  const setRegisterInfoToDefault = () => {
    setIsSuccessRegister(false)
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
        isSuccessRegister,
        setRegisterInfoToDefault,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
