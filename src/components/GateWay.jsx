import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function GateWay() {
  const count = useSelector(state => state.productsCount)
  if (!count) return <Navigate to="/cart" replace />
  return (
    <main className="page-shell inner-page checkout-page">
      <Link className="text-link" to="/payment">← Back to checkout</Link>
      <h1>Payment</h1>
      <p>Online payment is currently unavailable. Your items are still in your cart.</p>
    </main>
  )
}
