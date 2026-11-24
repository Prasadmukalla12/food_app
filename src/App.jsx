import { lazy, Suspense, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from './Redux/slicer/slicer'
import './styles/App.css'

const HomePage = lazy(() => import('./StartUpPage/Index'))
const Login = lazy(() => import('./EntryPonints/Login'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Menu = lazy(() => import('./components/Menu'))
const CartItems = lazy(() => import('./components/CartItems'))
const Payment = lazy(() => import('./components/payment'))
const GateWay = lazy(() => import('./components/GateWay'))
const accountKey = 'delicious-user'

function readSavedUser() {
  try {
    const user = JSON.parse(localStorage.getItem(accountKey))
    if (typeof user?.name === 'string' && typeof user.email === 'string') return user
  } catch {
    // Sign in again if browser storage is unavailable or the data is invalid.
  }
  return null
}

function RequireAccount({ user }) {
  const location = useLocation()
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  )
}

export default function App() {
  const [user, setUser] = useState(readSavedUser)
  const dispatch = useDispatch()

  function signIn({ name, email }) {
    const profile = { name, email }
    try {
      localStorage.setItem(accountKey, JSON.stringify(profile))
    } catch {
      // The user can still stay signed in until the page is refreshed.
    }
    setUser(profile)
  }

  function logout() {
    try {
      localStorage.removeItem(accountKey)
    } catch {
      // Clear the current page state even when browser storage is unavailable.
    }
    dispatch(clearCart())
    setUser(null)
  }

  const loading = (
    <p className="mx-auto w-[min(100%-32px,1184px)] py-16" role="status">
      Loading…
    </p>
  )

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/menu" element={<Menu user={user} />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Login onSuccess={signIn} />
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login key="register" register onSuccess={signIn} />
            )
          }
        />
        <Route element={<RequireAccount user={user} />}>
          <Route
            path="/dashboard"
            element={<Dashboard user={user} onLogout={logout} />}
          />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gateway" element={<GateWay />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
