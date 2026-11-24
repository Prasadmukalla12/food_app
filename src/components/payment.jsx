import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { rupees } from './money'

export default function Payment() {
  const products = useSelector(state => state.products)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')
  const delivery = 49
  let subtotal = 0
  for (const product of products) {
    subtotal += product.price
  }

  function applyCoupon(event) {
    event.preventDefault()
    const code = coupon.trim().toUpperCase()
    if (code === 'NEW2026') {
      setDiscount(subtotal * 0.1)
      setMessage('10% discount applied.')
    } else {
      setDiscount(0)
      setMessage('Enter a valid coupon code.')
    }
  }

  if (!products.length) return <Navigate to="/cart" replace />

  return (
    <main
      className={`
        mx-auto w-[min(100%-32px,1184px)] py-6 tablet:py-9
        wide:py-14 max-w-xl
      `}
    >
      <Link
        className="font-bold text-link underline underline-offset-[3px]"
        to="/cart"
      >
        ← Back to cart
      </Link>
      <h1
        className={`
          mb-[19.2px] font-display text-[32px]/[33px] tablet:text-[44px]/[45px]
          wide:text-[60px]/[62px] font-bold tracking-[-2px] mt-2
        `}
      >
        Checkout
      </h1>
      <section className="grid gap-4 rounded-[14.4px] border border-line bg-white p-4">
        <h2 className="text-[18.4px]/[23px] font-[750]">Price details</h2>
        <dl className="grid gap-[9.6px]">
          <div className="flex justify-between gap-4">
            <dt>Subtotal</dt>
            <dd>{rupees(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Delivery fee</dt>
            <dd>{rupees(delivery)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between gap-4">
              <dt>Discount</dt>
              <dd>−{rupees(discount)}</dd>
            </div>
          )}
          <div
            className={`
              flex justify-between gap-4 border-t border-line pt-[9.6px]
              font-bold
            `}
          >
            <dt>Order total</dt>
            <dd>{rupees(subtotal + delivery - discount)}</dd>
          </div>
        </dl>
        <form className="flex flex-wrap items-end gap-2" onSubmit={applyCoupon}>
          <label className="grid gap-[5.6px] font-[650] min-w-0 flex-[1_1_144px]">
            Coupon code
            <input
              className={`
                min-h-11 rounded-[10.4px] border border-field bg-white
                w-full px-[11.2px] py-[8.8px]
              `}
              value={coupon}
              onChange={event => setCoupon(event.target.value)}
              placeholder="NEW2026"
            />
          </label>
          <button
            className={`
              inline-flex min-h-11 items-center justify-center gap-2
              rounded-xl px-4 py-[8.8px] text-center font-bold border
              border-[#ecd4c2] bg-cream text-link hover:bg-[#ffe5ce]
            `}
            type="submit"
          >
            Apply
          </button>
        </form>
        {message && <p role="status">{message}</p>}
        <Link
          className={`
            inline-flex min-h-11 items-center justify-center gap-2
            rounded-xl px-4 py-[8.8px] text-center font-bold border
            border-transparent bg-accent text-white hover:bg-accent-hover
          `}
          to="/gateway"
        >
          Continue to payment
        </Link>
      </section>
    </main>
  )
}
