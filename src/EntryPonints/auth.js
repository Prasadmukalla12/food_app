export async function authRequest(action, details) {
  const response = await fetch(`/api/auth/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  })
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The account service is unavailable. Please try again.')
  }
  const result = await response.json()
  if (!response.ok) throw new Error(result.message)
  return result.user
}
