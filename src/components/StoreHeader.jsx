import { Link } from 'react-router-dom'

export default function StoreHeader({ user, children }) {
  return (
    <header className="store-header">
      <div className="page-shell header-row">
        <Link className="brand" to="/">Delicious<span>.</span></Link>
        <nav aria-label="Main navigation">
          <Link to="/menu">Menu</Link>
          {children ?? (user
            ? <Link className="button primary" to="/dashboard">Order food</Link>
            : <><Link to="/login">Sign in</Link><Link className="button primary" to="/register">Create account</Link></>)}
        </nav>
      </div>
    </header>
  )
}
