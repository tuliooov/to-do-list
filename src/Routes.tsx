import { Route, Routes } from 'react-router-dom'
import { NoUserRoute } from './contexts/NoUserRoute'
import { ProtectedRoute } from './contexts/ProtectedRoute'
import { IUser, useUserContext } from './contexts/UserProvider'
import { DefaultLayout } from './layouts/DefaultLayout'
import { App } from './pages/App'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './lib/firebase'
import { useState } from 'react'

export function Router() {

  const [userVerificated, setUserVerificated] = useState(false)

  const { handleChangeUser } = useUserContext()

  onAuthStateChanged(auth, (currentUser) => {
    handleChangeUser(currentUser as IUser)
    setUserVerificated(true)
  })

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {
          userVerificated && 
          <>
            <Route path={'/login'} element={
              <NoUserRoute>
                <Login />  
              </NoUserRoute>
            } />
            <Route path={'/register'} element={
              <NoUserRoute>
                <Register />  
              </NoUserRoute>
            } />
            <Route path={'/'} element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>} 
            />
          </>
        }
      </Route>
    </Routes>
  )
}
