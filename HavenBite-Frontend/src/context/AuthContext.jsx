import { createContext, useContext, useState, useEffect } from "react";
import axios from '../api/axios';

export const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true) // 👈 prevents flash of wrong UI

  // On every page load/refresh, check if cookie is still valid
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/user/me')
        setLoggedInUser(response.data.data.user)
      } catch (error) {
        console.log("current user error", error.response?.data)
        // Token expired or not present — user is logged out
        setLoggedInUser(null)
      } finally {
        setIsAuthLoading(false) // 👈 done checking either way
      }
    }
    fetchCurrentUser() 
  }, [])

  const loginUser = async (userLoginData) => {
    try {
      const response = await axios.post('/user/login', userLoginData)
      console.log("response from logged in service" , response.data.data.user)
      setLoggedInUser(response.data.data.user)
    } catch (error) {
      console.log("login error", error.response?.data)
      throw error
    }
  }

  const registerUser = async (userRegisterData) => {
    try {
      const response = await axios.post('/user/register', userRegisterData)
      console.log("register response", response)
    } catch (error) {
      console.log("register error", error.response?.data)
      throw error
    }
  }

  const logout = async () => {
    try {
      await axios.post('/user/logout')
      setLoggedInUser(null)
    } catch (error) {
      console.log("logout error", error.response?.data)
      throw error
    }
  }

  const value = {
    loggedInUser,
    isAuthLoading, 
    loginUser,
    registerUser,
    logout,
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}