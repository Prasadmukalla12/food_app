import Catalog from './Catalog'

export default function Dashboard({ user, onLogout }) {
  return <Catalog user={user} ordering onLogout={onLogout} />
}
