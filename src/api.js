const BASE = '/api/v1/users'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const registerUser = (body) =>
  request('/register', { method: 'POST', body: JSON.stringify(body) })

export const loginUser = (body) =>
  request('/login', { method: 'POST', body: JSON.stringify(body) })

export const logoutUser = () =>
  request('/logout', { method: 'POST' })

export const getCurrentUser = () =>
  request('/current-user')
