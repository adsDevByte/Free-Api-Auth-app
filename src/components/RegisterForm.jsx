import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { registerUser, loginUser, getCurrentUser } from '../api'

export default function RegisterForm({ onSuccess, addToast, switchToLogin }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      addToast('Please fill in all fields', 'error'); return
    }
    if (form.password.length < 6) {
      addToast('Password must be at least 6 characters', 'error'); return
    }
    try {
      setLoading(true)
      await registerUser({ ...form, role: 'ADMIN' })
      await loginUser({ username: form.username, password: form.password })
      const { data } = await getCurrentUser()
      addToast('Account created! Welcome 🎉', 'success')
      onSuccess(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Username" value={form.username} onChange={set('username')} placeholder="johndoe" disabled={loading} />
      <Input label="Email" type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" disabled={loading} />
      <Input label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" disabled={loading} />
      <div style={{ marginTop: 4 }}>
        <Button onClick={handleSubmit} loading={loading}>Create Account</Button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
        Already have an account?{' '}
        <button onClick={switchToLogin} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          Sign in
        </button>
      </p>
    </div>
  )
}
