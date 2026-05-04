import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { loginUser, getCurrentUser } from '../api'

export default function LoginForm({ onSuccess, addToast, switchToRegister }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      addToast('Please fill in all fields', 'error'); return
    }
    try {
      setLoading(true)
      await loginUser(form)
      const { data } = await getCurrentUser()
      addToast('Welcome back!', 'success')
      onSuccess(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Username" value={form.username} onChange={set('username')} placeholder="johndoe" disabled={loading} />
      <Input label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Your password" disabled={loading} onKeyDown={handleKeyDown} />
      <div style={{ marginTop: 4 }}>
        <Button onClick={handleSubmit} loading={loading}>Sign In</Button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
        No account yet?{' '}
        <button onClick={switchToRegister} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          Create one
        </button>
      </p>
    </div>
  )
}
