import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../Redux/slicer/slicer'
import { rupees } from './money'

export default function CartItems() {
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()
  const lines = new Map()
  for (const product of products) {
    const line = lines.get(product.id)
    if (line) line.quantity += 1
    else lines.set(product.id, { product, quantity: 1 })
  }
  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <main className="page-shell inner-page">
      <Link className="text-link" to="/dashboard">← Back to dishes</Link>
      <h1>Your cart</h1>
      {products.length === 0 ? <p>Your cart is empty. <Link className="text-link" to="/dashboard">Find something delicious</Link>.</p> :
        <div className="checkout-layout">
          <ul className="cart-list">
            {Array.from(lines, ([id, { product, quantity }]) => (
              <li className="cart-row" key={id}>
                <img src={product.image} alt="" />
                <div><h2>{product.title}</h2><p className="muted">{quantity} × {rupees(product.price)}</p></div>
                <button className="text-link" aria-label={`Remove ${product.title}`} onClick={() => dispatch(removeFromCart(product))}>Remove</button>
              </li>
            ))}
          </ul>
          <aside className="summary"><h2>Subtotal</h2><strong>{rupees(total)}</strong><Link className="button primary" to="/payment">Go to checkout</Link></aside>
        </div>}
    </main>
  )
}
