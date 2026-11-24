import { Link } from 'react-router-dom'
import StoreHeader from '../components/StoreHeader'

const favorites = [
  {
    name: 'Biryani',
    image: '/biryani/biryani1.jpg',
    category: 'biryani',
    description: 'Fragrant rice, slow-cooked with spices.',
  },
  {
    name: 'Pizza',
    image: '/pizza/pizza1.jpg',
    category: 'pizza',
    description: 'A slice for every kind of craving.',
  },
  {
    name: 'Burgers',
    image: '/burger/burger1.jpg',
    category: 'burger',
    description: 'Stacked, saucy and made for lunch.',
  },
  {
    name: 'Juices',
    image: '/juice/juice1.jpg',
    category: 'juice',
    description: 'A refreshing sip alongside your meal.',
  },
]

export default function HomePage({ user }) {
  return (
    <>
      <StoreHeader user={user} />
      <main
        className={`
          mx-auto w-[min(100%-32px,1184px)] pt-4 tablet:pt-6
          wide:pt-10 pb-16
        `}
      >
        <section
          className={`
            grid items-center gap-6 tablet:gap-11 wide:gap-20
            rounded-3xl bg-sand p-6 tablet:p-9 wide:p-16
            tablet:grid-cols-2
          `}
        >
          <div>
            <h1
              className={`
                font-display text-[48px]/[49px] tablet:text-[60px]/[62px]
                wide:text-[96px]/[99px]
                font-bold tracking-[-2px]
              `}
            >
              Good food.
              <br />
              <span className="text-accent">Delivered.</span>
            </h1>
            <p className="my-5 max-w-75 text-[16px] wide:text-[19.2px] text-muted">
              From slow-cooked biryani to cheesy pizza, find something delicious for
              lunch, dinner, or whenever hunger hits.
            </p>
            <div className="flex flex-wrap items-center gap-x-[19.2px] gap-y-[10.4px]">
              <Link
                className={`
                  inline-flex min-h-11 items-center justify-center gap-2
                  rounded-xl px-4 py-[8.8px] text-center font-bold
                  border border-transparent bg-accent text-white
                  hover:bg-accent-hover
                `}
                to={user ? '/dashboard' : '/menu'}
              >
                Explore the menu <span aria-hidden="true">↗</span>
              </Link>
              {!user && (
                <Link
                  className={`
                    inline-flex min-h-11 items-center justify-center
                    gap-2 rounded-xl px-4 py-[8.8px] text-center
                    font-bold border border-[#ecd4c2] bg-cream text-link
                    hover:bg-[#ffe5ce]
                  `}
                  to="/login"
                >
                  Sign in to order
                </Link>
              )}
            </div>
          </div>
          <img
            className="max-h-108 w-full object-contain"
            src="/HeroSectionMeal.png"
            alt="A plated meal from Delicious"
            fetchPriority="high"
          />
        </section>
        <section className="mt-8 tablet:mt-10 wide:mt-16">
          <h2
            className={`
              mb-5 font-display text-[29.6px]/[30.5px] tablet:text-[36px]/[37px]
              wide:text-[48px]/[49px] font-bold tracking-[-2px]
            `}
          >
            What are you craving?
          </h2>
          <div
            className={`
              grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]
              gap-4
            `}
          >
            {favorites.map(food => (
              <Link
                className={`
                  flex min-w-0 flex-col overflow-hidden rounded-2xl
                  border border-line bg-white hover:border-accent
                `}
                key={food.category}
                to={`/menu?category=${food.category}`}
              >
                <img
                  className="aspect-16/10 w-full bg-[#f5e6d5] object-cover"
                  src={food.image}
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col gap-[7.2px] p-4">
                  <h3 className="text-[18.4px]/[23px] font-[750]">{food.name}</h3>
                  <p className="wrap-anywhere text-muted">{food.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-espresso text-[#fff8ed]">
        <div
          className={`
            mx-auto w-[min(100%-32px,1184px)] flex flex-wrap items-center
            justify-between gap-x-6 gap-y-3 py-[14.4px]
          `}
        >
          <Link
            className={`
              font-display text-[24.8px]/[37.2px] tablet:text-[31.2px]/[46.8px] font-bold
              tracking-[-1.6px]
            `}
            to="/"
          >
            Delicious<span className="text-[#ffb797]">.</span>
          </Link>
          <Link to="/menu">Browse the menu</Link>
        </div>
      </footer>
    </>
  )
}
