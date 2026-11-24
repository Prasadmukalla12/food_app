import { Link } from 'react-router-dom'
import StoreHeader from '../components/StoreHeader'

const favorites = [
  { name: 'Biryani', image: '/biryani/biryani1.jpg', category: 'biryani', description: 'Fragrant rice, slow-cooked with spices.' },
  { name: 'Pizza', image: '/pizza/pizza1.jpg', category: 'pizza', description: 'A slice for every kind of craving.' },
  { name: 'Burgers', image: '/burger/burger1.jpg', category: 'burger', description: 'Stacked, saucy and made for lunch.' },
  { name: 'Juices', image: '/juice/juice1.jpg', category: 'juice', description: 'A refreshing sip alongside your meal.' },
]

export default function HomePage({ user }) {
  return (
    <>
      <StoreHeader user={user} />
      <main className="page-shell landing">
        <section className="hero">
          <div>
            <h1>Good food.<br /><span>Delivered.</span></h1>
            <p>From slow-cooked biryani to cheesy pizza, find something delicious for lunch, dinner, or whenever hunger hits.</p>
            <div className="actions">
              <Link className="button primary" to={user ? '/dashboard' : '/menu'}>Explore the menu <span aria-hidden="true">↗</span></Link>
              {!user && <Link className="button secondary" to="/login">Sign in to order</Link>}
            </div>
          </div>
          <img src="/HeroSectionMeal.png" alt="A plated meal from Delicious" fetchPriority="high" />
        </section>
        <section className="favorites">
          <h2>What are you craving?</h2>
          <div className="food-grid">
            {favorites.map(food => (
              <Link className="food-card category-card" key={food.category} to={`/menu?category=${food.category}`}>
                <img src={food.image} alt="" loading="lazy" />
                <div className="card-body"><h3>{food.name}</h3><p>{food.description}</p></div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="store-footer"><div className="page-shell"><Link className="brand" to="/">Delicious<span>.</span></Link><Link to="/menu">Browse the menu</Link></div></footer>
    </>
  )
}
