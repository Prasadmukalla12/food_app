import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { rupees } from './money'

export default function Payment() {
  const products = useSelector(state => state.products)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')
  const subtotal = products.reduce((sum, product) => sum + product.price, 0)
  const delivery = 49

  function applyCoupon(event) {
    event.preventDefault()
    const valid = coupon.trim().toUpperCase() === 'NEW2026'
    setDiscount(valid ? subtotal * 0.1 : 0)
    setMessage(valid ? '10% discount applied.' : 'Enter a valid coupon code.')
  }

  if (!products.length) return <Navigate to="/cart" replace />

  return (
    <main className="page-shell inner-page checkout-page">
      <Link className="text-link" to="/cart">← Back to cart</Link>
      <h1>Checkout</h1>
      <section className="summary">
        <h2>Price details</h2>
        <dl>
          <div><dt>Subtotal</dt><dd>{rupees(subtotal)}</dd></div>
          <div><dt>Delivery fee</dt><dd>{rupees(delivery)}</dd></div>
          {discount > 0 && <div><dt>Discount</dt><dd>−{rupees(discount)}</dd></div>}
          <div className="total"><dt>Order total</dt><dd>{rupees(subtotal + delivery - discount)}</dd></div>
        </dl>
        <form className="coupon" onSubmit={applyCoupon}>
          <label>Coupon code<input value={coupon} onChange={event => setCoupon(event.target.value)} placeholder="NEW2026" /></label>
          <button className="button secondary" type="submit">Apply</button>
        </form>
        {message && <p role="status">{message}</p>}
        <Link className="button primary" to="/gateway">Continue to payment</Link>
      </section>
    </main>
  )
}
