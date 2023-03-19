import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './contexts/ProtectedRoute'
import { DefaultLayout } from './layouts/DefaultLayout'
import { App } from './pages/App'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/'} element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>} 
        />
      </Route>
    </Routes>
  )
}
