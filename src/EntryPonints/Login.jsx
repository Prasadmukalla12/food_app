import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authRequest } from './auth'

export default function Login({ register = false, onSuccess }) {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  async function submit(event) {
    event.preventDefault()
    const details = Object.fromEntries(new FormData(event.currentTarget))
    setPending(true)
    setError('')
    try {
      const user = await authRequest(register ? 'register' : 'login', details)
      onSuccess(user)
      const destination = ['/dashboard', '/cart', '/payment', '/gateway'].includes(state?.from) ? state.from : '/dashboard'
      navigate(destination, { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="page-shell auth-layout">
      <div className="auth-photo" aria-hidden="true" />
      <section className="auth-panel">
        <Link className="brand" to="/">Delicious<span>.</span></Link>
        <h1>{register ? 'Create your account' : 'Welcome back'}</h1>
        <p className="muted">{register ? 'Join Delicious to start ordering.' : 'Sign in to order your favorites.'}</p>
        <form className="auth-form" onSubmit={submit}>
          {register && <label>Full name<input name="name" autoComplete="name" required maxLength={80} /></label>}
          <label>Email address<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
          <label>Password<input type="password" name="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 8 : undefined} maxLength={128} required /></label>
          {register && <small className="muted">Use at least 8 characters.</small>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button primary" type="submit" disabled={pending}>{pending ? 'Please wait…' : register ? 'Create account' : 'Sign in'}</button>
        </form>
        <p className="muted">{register ? 'Already have an account?' : 'New to Delicious?'}{' '}
          <Link className="text-link" to={register ? '/login' : '/register'} state={state}>{register ? 'Sign in' : 'Create an account'}</Link>
        </p>
      </section>
    </main>
  )
}
