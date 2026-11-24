import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authRequest } from './EntryPonints/auth'
import { clearCart } from './Redux/slicer/slicer'
import './styles/App.css'

const HomePage = lazy(() => import('./StartUpPage/Index'))
const Login = lazy(() => import('./EntryPonints/Login'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Menu = lazy(() => import('./components/Menu'))
const CartItems = lazy(() => import('./components/CartItems'))
const Payment = lazy(() => import('./components/payment'))
const GateWay = lazy(() => import('./components/GateWay'))

function RequireAccount({ user }) {
  const location = useLocation()
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace />
}

export default function App() {
  const [user, setUser] = useState(undefined)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    let active = true
    authRequest('session')
      .then(account => { if (active) setUser(account) })
      .catch(() => { if (active) setError('We could not reach the account service.') })
    return () => { active = false }
  }, [])

  async function logout() {
    await authRequest('logout')
    dispatch(clearCart())
    setUser(null)
  }

  const loading = <p className="page-shell page-status" role="status">Loading…</p>
  if (error) return <main className="page-shell page-status"><p role="alert">{error}</p><button className="button primary" onClick={() => window.location.reload()}>Try again</button></main>
  if (user === undefined) return loading

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/menu" element={<Menu user={user} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onSuccess={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Login key="register" register onSuccess={setUser} />} />
        <Route element={<RequireAccount user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} onLogout={logout} />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gateway" element={<GateWay />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
