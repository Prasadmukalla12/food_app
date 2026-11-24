import { Link } from 'react-router-dom'

export default function StoreHeader({ user, children }) {
  return (
    <header className="border-b border-line bg-paper">
      <div
        className={`
          mx-auto w-[min(100%-32px,1184px)] flex flex-wrap items-center
          justify-between gap-x-6 gap-y-3 py-[14.4px]
        `}
      >
        <Link
          className={`
            font-display text-[24.8px]/[37.2px] tablet:text-[31.2px]/[46.8px] font-bold
            tracking-[-1.6px]
          `}
          to="/"
        >
          Delicious<span className="text-accent">.</span>
        </Link>
        <nav
          className="flex flex-wrap items-center gap-x-[19.2px] gap-y-[10.4px]"
          aria-label="Main navigation"
        >
          <Link className="inline-flex min-h-11 items-center font-[650]" to="/menu">
            Menu
          </Link>
          {children ??
            (user ? (
              <Link
                className={`
                  inline-flex min-h-11 items-center justify-center gap-2
                  rounded-xl px-4 py-[8.8px] text-center font-bold
                  border border-transparent bg-accent text-white
                  hover:bg-accent-hover
                `}
                to="/dashboard"
              >
                Order food
              </Link>
            ) : (
              <>
                <Link
                  className="inline-flex min-h-11 items-center font-[650]"
                  to="/login"
                >
                  Sign in
                </Link>
                <Link
                  className={`
                    inline-flex min-h-11 items-center justify-center
                    gap-2 rounded-xl px-4 py-[8.8px] text-center
                    font-bold border border-transparent bg-accent text-white
                    hover:bg-accent-hover
                  `}
                  to="/register"
                >
                  Create account
                </Link>
              </>
            ))}
        </nav>
      </div>
    </header>
  )
}
