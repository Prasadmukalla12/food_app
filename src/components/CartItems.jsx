import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../Redux/slicer/slicer'
import { rupees } from './money'

export default function CartItems() {
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()
  const cartById = new Map()
  let total = 0

  for (const product of products) {
    const item = cartById.get(product.id)
    if (item) {
      item.quantity += 1
    } else {
      cartById.set(product.id, { product, quantity: 1 })
    }
    total += product.price
  }

  const cartItems = Array.from(cartById.values())

  function removeItem(product) {
    dispatch(removeFromCart(product))
  }

  return (
    <main
      className={`
        mx-auto w-[min(100%-32px,1184px)] py-6 tablet:py-9
        wide:py-14
      `}
    >
      <Link
        className="font-bold text-link underline underline-offset-[3px]"
        to="/dashboard"
      >
        ← Back to dishes
      </Link>
      <h1
        className={`
          mb-[19.2px] font-display text-[32px]/[33px] tablet:text-[44px]/[45px]
          wide:text-[60px]/[62px] font-bold tracking-[-2px] mt-2
        `}
      >
        Your cart
      </h1>
      {products.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <Link
            className="font-bold text-link underline underline-offset-[3px]"
            to="/dashboard"
          >
            Find something delicious
          </Link>
          .
        </p>
      ) : (
        <div
          className={`
            grid items-start gap-4
            tablet:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]
          `}
        >
          <ul className="grid items-start gap-4">
            {cartItems.map(({ product, quantity }) => (
              <li
                className={`
                  flex flex-wrap items-center gap-x-4 gap-y-2
                  rounded-[14.4px] border border-line bg-white p-4
                `}
                key={product.id}
              >
                <img
                  className="aspect-square w-16 rounded-lg object-cover"
                  src={product.image}
                  alt=""
                />
                <div className="flex-[1_1_128px]">
                  <h2 className="text-[18.4px]/[23px] font-[750]">{product.title}</h2>
                  <p className="wrap-anywhere text-muted">
                    {quantity} × {rupees(product.price)}
                  </p>
                </div>
                <button
                  className="font-bold text-link underline underline-offset-[3px]"
                  aria-label={`Remove ${product.title}`}
                  onClick={() => removeItem(product)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <aside className="grid gap-4 rounded-[14.4px] border border-line bg-white p-4">
            <h2 className="text-[18.4px]/[23px] font-[750]">Subtotal</h2>
            <strong>{rupees(total)}</strong>
            <Link
              className={`
                inline-flex min-h-11 items-center justify-center gap-2
                rounded-xl px-4 py-[8.8px] text-center font-bold border
                border-transparent bg-accent text-white hover:bg-accent-hover
              `}
              to="/payment"
            >
              Go to checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  )
}
