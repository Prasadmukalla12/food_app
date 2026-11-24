import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authRequest } from './auth'

const accountPages = ['/dashboard', '/cart', '/payment', '/gateway']

export default function Login({ register = false, onSuccess }) {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const action = register ? 'register' : 'login'
  const submitLabel = register ? 'Create account' : 'Sign in'

  async function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const details = {
      email: form.get('email'),
      password: form.get('password'),
    }
    if (register) {
      details.name = form.get('name')
    }

    setPending(true)
    setError('')
    try {
      const user = await authRequest(action, details)
      onSuccess(user)
      const destination = accountPages.includes(state?.from) ? state.from : '/dashboard'
      navigate(destination, { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <main
      className={`
        mx-auto w-[min(100%-32px,1184px)] my-4 tablet:my-11
        wide:my-20 grid max-w-232 overflow-hidden rounded-2xl border
        border-line bg-white tablet:grid-cols-[0.9fr_1fr]
      `}
    >
      <div
        className={`
          hidden bg-sand bg-[url('/biryani/biryani1.jpg')] bg-cover
          bg-center bg-no-repeat tablet:block
        `}
        aria-hidden="true"
      />
      <section className="min-w-0 p-5 tablet:p-7 wide:p-12">
        <Link
          className={`
            font-display text-[24.8px]/[37.2px] tablet:text-[31.2px]/[46.8px] font-bold
            tracking-[-1.6px]
          `}
          to="/"
        >
          Delicious<span className="text-accent">.</span>
        </Link>
        <h1
          className={`
            mb-[19.2px] font-display text-[32px]/[33px] tablet:text-[44px]/[45px]
            wide:text-[60px]/[62px] font-bold tracking-[-2px]
            mt-[22.4px]
          `}
        >
          {register ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="wrap-anywhere text-muted">
          {register
            ? 'Join Delicious to start ordering.'
            : 'Sign in to order your favorites.'}
        </p>
        <form className="my-[20.8px] grid gap-[14.4px]" onSubmit={submit}>
          {register && (
            <label className="grid gap-[5.6px] font-[650]">
              Full name
              <input
                className={`
                  min-h-11 rounded-[10.4px] border border-field bg-white
                  w-full px-[11.2px] py-[8.8px]
                `}
                name="name"
                autoComplete="name"
                required
                maxLength={80}
              />
            </label>
          )}
          <label className="grid gap-[5.6px] font-[650]">
            Email address
            <input
              className={`
                min-h-11 rounded-[10.4px] border border-field bg-white
                w-full px-[11.2px] py-[8.8px]
              `}
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label className="grid gap-[5.6px] font-[650]">
            Password
            <input
              className={`
                min-h-11 rounded-[10.4px] border border-field bg-white
                w-full px-[11.2px] py-[8.8px]
              `}
              type="password"
              name="password"
              autoComplete={register ? 'new-password' : 'current-password'}
              minLength={register ? 8 : undefined}
              maxLength={128}
              required
            />
          </label>
          {register && (
            <small className="wrap-anywhere text-muted">
              Use at least 8 characters.
            </small>
          )}
          {error && (
            <p className="text-[#a1261b]" role="alert">
              {error}
            </p>
          )}
          <button
            className={`
              inline-flex min-h-11 items-center justify-center gap-2
              rounded-xl px-4 py-[8.8px] text-center font-bold border
              border-transparent bg-accent text-white hover:bg-accent-hover
            `}
            type="submit"
            disabled={pending}
          >
            {pending ? 'Please wait…' : submitLabel}
          </button>
        </form>
        <p className="wrap-anywhere text-muted">
          {register ? 'Already have an account?' : 'New to Delicious?'}{' '}
          <Link
            className="font-bold text-link underline underline-offset-[3px]"
            to={register ? '/login' : '/register'}
            state={state}
          >
            {register ? 'Sign in' : 'Create an account'}
          </Link>
        </p>
      </section>
    </main>
  )
}
