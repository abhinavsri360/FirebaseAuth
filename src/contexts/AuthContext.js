import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signup (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function updateEmail (email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword (password) {
    return currentUser.updatePassword(password)
  }

  function resetPassword (email) {
    auth.sendPasswordResetEmail(email)
  }

  function logout () {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
