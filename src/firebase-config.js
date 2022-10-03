// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBulx8jo4HwfS9eUPgYj5jnPvPQZtuOu-o',
  authDomain: 'hru-referees.firebaseapp.com',
  projectId: 'hru-referees',
  storageBucket: 'hru-referees.appspot.com',
  messagingSenderId: '386421740974',
  appId: '1:386421740974:web:8052e22c730f50f563643f',
  measurementId: 'G-8S5JGTHPRG',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore()

export default app
