import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// type
type firebaseConfigType = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

// exposed data
const firebaseConfig: firebaseConfigType = {
  apiKey: 'AIzaSyAWauGuBakcSugJV-4tdBS23P1UQD-PyEc',
  authDomain: 'react-todo--zustand.firebaseapp.com',
  projectId: 'react-todo--zustand',
  storageBucket: 'react-todo--zustand.appspot.com',
  messagingSenderId: '373743181044',
  appId: '1:373743181044:web:a68bd5dc6e9df5b0dc52a1'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
export { auth, googleProvider }
