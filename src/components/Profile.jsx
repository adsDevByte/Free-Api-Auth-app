import { useState } from 'react'
import Button from './Button'
import { logoutUser } from '../api'

const s = {
  avatar: {
    width: 72, height: 72, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent) 0%, #a07830 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 28, fontWeight: 700, color: '#0f0e0c',
    fontFamily: 'Syne, sans-serif',
    flexShrink: 0,
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '4px 10px', borderRadius: 20,
    background: '#1a2e1e', border: '1px solid #5a9e6f33',
    color: 'var(--green)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.05em',
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
  },
  field: {
    display: 'flex', flexDirection: 'column', gap: 4,
    padding: '14px 0',
    borderBottom: '1px solid var(--border)',
  },
  fieldLabel: {
    fontSize: 11, fontWeight: 500, color: 'var(--muted)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 14, color: 'var(--text)', fontWeight: 400,
  },
}

export default function Profile({ user, onLogout, addToast }) {
  const [loading, setLoading] = useState(false)

  const initials = user.username
    ? user.username.slice(0, 2).toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() || '??'

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logoutUser()
      addToast('Logged out successfully', 'info')
      onLogout()
    } catch {
      addToast('Logout failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { label: 'Username', value: user.username || '—' },
    { label: 'Email', value: user.email || '—' },
    { label: 'Role', value: user.role || '—' },
    { label: 'Account ID', value: user._id ? `${user._id.slice(0, 8)}...` : '—' },
    { label: 'Email Verified', value: user.isEmailVerified ? 'Yes' : 'No' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={s.avatar}>{initials}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>
            {user.username || 'User'}
          </h2>
          <div style={s.badge}>
            <span style={s.dot} />
            Active session
          </div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {fields.map(f => (
          <div key={f.label} style={s.field}>
            <span style={s.fieldLabel}>{f.label}</span>
            <span style={s.fieldValue}>{f.value}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <Button variant="danger" onClick={handleLogout} loading={loading}>
        Sign Out
      </Button>
    </div>
  )
}
