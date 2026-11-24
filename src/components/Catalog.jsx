import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { addToCartItems } from '../Redux/slicer/slicer'
import StoreHeader from './StoreHeader'
import { rupees } from './money'

export default function Catalog({ user, ordering = false, onLogout }) {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [retry, setRetry] = useState(0)
  const [search, setSearch] = useState('')
  const [params, setParams] = useSearchParams()
  const dispatch = useDispatch()
  const count = useSelector(state => state.productsCount)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/item.json', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Menu request failed')
        return response.json()
      })
      .then(setItems)
      .catch(error => {
        if (error.name !== 'AbortError') setError('We could not load the menu.')
      })
    return () => controller.abort()
  }, [retry])

  const categories = Object.keys(items ?? {})
  const chosen = params.get('category')
  const category = categories.includes(chosen) ? chosen : 'all'
  const products = (category === 'all' ? Object.values(items ?? {}).flat() : items[category])
    .filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()))

  function addItem(item) {
    dispatch(addToCartItems(item))
    setNotice(`${item.title} added to your cart. ${count + 1} items in cart.`)
  }

  async function signOut() {
    try {
      await onLogout()
    } catch {
      setNotice('We could not sign you out. Please try again.')
    }
  }

  return (
    <>
      <StoreHeader user={user}>
        {ordering ? <><button className="nav-button" onClick={signOut}>Sign out</button><Link className="button primary" to="/cart"><i className="bi bi-bag" aria-hidden="true" /> Cart ({count})</Link></> : null}
      </StoreHeader>
      <main className="page-shell inner-page">
        {ordering && <p className="muted">Welcome, {user.name}</p>}
        <h1>{ordering ? 'What sounds good today?' : 'Explore the menu'}</h1>
        <div className="catalog-controls">
          <label className="search-field"><i className="bi bi-search" aria-hidden="true" /><input type="search" placeholder="Search dishes" aria-label="Search dishes" value={search} onChange={event => setSearch(event.target.value)} /></label>
          <div className="filters" aria-label="Food categories">
            {['all', ...categories].map(value => <button key={value} aria-pressed={category === value} onClick={() => setParams(value === 'all' ? {} : { category: value }, { replace: true })}>{value === 'all' ? 'All dishes' : value}</button>)}
          </div>
        </div>
        <p className="visually-hidden" role="status">{notice}</p>
        {notice && <p className="notice" aria-hidden="true">{notice}</p>}
        {error && <div role="alert"><p>{error}</p><button className="button secondary" onClick={() => { setError(''); setRetry(retry + 1) }}>Try again</button></div>}
        {!items && !error && <p role="status">Loading dishes…</p>}
        {items && !products.length && <p>No dishes match your search.</p>}
        <div className="food-grid">
          {products.map(item => (
            <article className="food-card" key={item.id}>
              <img src={item.image} alt="" loading="lazy" />
              <div className="card-body">
                <span className="rating" aria-label={`Rated ${item.rating} out of five`}>★ {item.rating}</span>
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
                <div className="card-bottom"><strong>{rupees(item.price)}</strong>
                  {ordering
                    ? <button className="button secondary" aria-label={`Add ${item.title} to cart`} onClick={() => addItem(item)}>Add +</button>
                    : <Link className="button secondary" to={user ? `/dashboard?${params}` : '/login'}>Order</Link>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
