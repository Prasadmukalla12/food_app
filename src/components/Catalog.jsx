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

    async function loadMenu() {
      try {
        const response = await fetch('/item.json', { signal: controller.signal })
        if (!response.ok) throw new Error('Menu request failed')
        const menu = await response.json()
        setItems(menu)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('We could not load the menu.')
        }
      }
    }

    loadMenu()
    return () => controller.abort()
  }, [retry])

  const menu = items ?? {}
  const categories = Object.keys(menu)
  const chosen = params.get('category')
  const category = categories.includes(chosen) ? chosen : 'all'
  const categoryItems = category === 'all' ? Object.values(menu).flat() : menu[category]
  const query = search.trim().toLowerCase()
  const products = categoryItems.filter(item => item.title.toLowerCase().includes(query))

  function chooseCategory(value) {
    const nextParams = value === 'all' ? {} : { category: value }
    setParams(nextParams, { replace: true })
  }

  function retryMenu() {
    setError('')
    setRetry(attempt => attempt + 1)
  }

  function addItem(item) {
    dispatch(addToCartItems(item))
    setNotice(`${item.title} added to your cart. ${count + 1} items in cart.`)
  }

  return (
    <>
      <StoreHeader user={user}>
        {ordering ? (
          <>
            <button
              className="inline-flex min-h-11 items-center font-[650]"
              onClick={onLogout}
            >
              Sign out
            </button>
            <Link
              className={`
                inline-flex min-h-11 items-center justify-center gap-2
                rounded-xl px-4 py-[8.8px] text-center font-bold border
                border-transparent bg-accent text-white hover:bg-accent-hover
              `}
              to="/cart"
            >
              <i className="bi bi-bag" aria-hidden="true" /> Cart ({count})
            </Link>
          </>
        ) : null}
      </StoreHeader>
      <main
        className={`
          mx-auto w-[min(100%-32px,1184px)] py-6 tablet:py-9
          wide:py-14
        `}
      >
        {ordering && <p className="wrap-anywhere text-muted">Welcome, {user.name}</p>}
        <h1
          className={`
            mb-[19.2px] font-display text-[32px]/[33px] tablet:text-[44px]/[45px]
            wide:text-[60px]/[62px] font-bold tracking-[-2px] mt-2
          `}
        >
          {ordering ? 'What sounds good today?' : 'Explore the menu'}
        </h1>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <label
            className={`
              flex min-h-11 min-w-0 flex-[0_1_336px] items-center
              gap-[9.6px] rounded-[10.4px] border border-field bg-white
              px-3
            `}
          >
            <i className="bi bi-search" aria-hidden="true" />
            <input
              className="w-full min-w-0 py-[9.6px]"
              type="search"
              placeholder="Search dishes"
              aria-label="Search dishes"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-[6.4px]" aria-label="Food categories">
            {['all', ...categories].map(value => (
              <button
                className={`
                  min-h-11 rounded-full border border-line bg-white
                  px-[12.8px] py-[5.6px] capitalize aria-pressed:border-espresso
                  aria-pressed:bg-espresso aria-pressed:text-white
                `}
                key={value}
                aria-pressed={category === value}
                onClick={() => chooseCategory(value)}
              >
                {value === 'all' ? 'All dishes' : value}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {notice}
        </p>
        {notice && (
          <p className="mb-4 text-[#365a37]" aria-hidden="true">
            {notice}
          </p>
        )}
        {error && (
          <div role="alert">
            <p>{error}</p>
            <button
              className={`
                inline-flex min-h-11 items-center justify-center gap-2
                rounded-xl px-4 py-[8.8px] text-center font-bold border
                border-[#ecd4c2] bg-cream text-link hover:bg-[#ffe5ce]
              `}
              onClick={retryMenu}
            >
              Try again
            </button>
          </div>
        )}
        {!items && !error && <p role="status">Loading dishes…</p>}
        {items && !products.length && <p>No dishes match your search.</p>}
        <div
          className={`
            grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]
            gap-4
          `}
        >
          {products.map(item => (
            <article
              className={`
                flex min-w-0 flex-col overflow-hidden rounded-2xl border
                border-line bg-white
              `}
              key={item.id}
            >
              <img
                className="aspect-16/10 w-full bg-[#f5e6d5] object-cover"
                src={item.image}
                alt=""
                loading="lazy"
              />
              <div className="flex flex-1 flex-col gap-[7.2px] p-4">
                <span
                  className={`
                    self-start rounded-[6.4px] bg-cream px-[7.2px] py-[2.4px]
                    text-[12.8px] font-bold text-[#813819]
                  `}
                  aria-label={`Rated ${item.rating} out of five`}
                >
                  ★ {item.rating}
                </span>
                <h2 className="text-[18.4px]/[23px] font-[750]">{item.title}</h2>
                <p className="wrap-anywhere text-muted">{item.subtitle}</p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-[9.6px]">
                  <strong>{rupees(item.price)}</strong>
                  {ordering ? (
                    <button
                      className={`
                        inline-flex min-h-11 items-center justify-center
                        gap-2 rounded-xl px-4 py-[8.8px]
                        text-center font-bold border border-[#ecd4c2] bg-cream
                        text-link hover:bg-[#ffe5ce]
                      `}
                      aria-label={`Add ${item.title} to cart`}
                      onClick={() => addItem(item)}
                    >
                      Add +
                    </button>
                  ) : (
                    <Link
                      className={`
                        inline-flex min-h-11 items-center justify-center
                        gap-2 rounded-xl px-4 py-[8.8px]
                        text-center font-bold border border-[#ecd4c2] bg-cream
                        text-link hover:bg-[#ffe5ce]
                      `}
                      to={user ? `/dashboard?${params}` : '/login'}
                    >
                      Order
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
