import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function GateWay() {
  const count = useSelector(state => state.productsCount)
  if (!count) return <Navigate to="/cart" replace />
  return (
    <main
      className={`
        mx-auto w-[min(100%-32px,1184px)] py-6 tablet:py-9
        wide:py-14 max-w-xl
      `}
    >
      <Link
        className="font-bold text-link underline underline-offset-[3px]"
        to="/payment"
      >
        ← Back to checkout
      </Link>
      <h1
        className={`
          mb-[19.2px] font-display text-[32px]/[33px] tablet:text-[44px]/[45px]
          wide:text-[60px]/[62px] font-bold tracking-[-2px] mt-2
        `}
      >
        Payment
      </h1>
      <p>Online payment is currently unavailable. Your items are still in your cart.</p>
    </main>
  )
}
