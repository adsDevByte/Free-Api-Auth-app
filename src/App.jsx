import { useState, useEffect, useCallback } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Profile from './components/Profile'
import Toast from './components/Toast'
import { getCurrentUser } from './api'

const card = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '36px 32px',
  width: '100%',
}

const tabBar = {
  display: 'flex',
  gap: 2,
  background: 'var(--bg3)',
  borderRadius: 10,
  padding: 4,
  marginBottom: 28,
}

const tab = (active) => ({
  flex: 1,
  padding: '9px 0',
  borderRadius: 7,
  border: 'none',
  background: active ? 'var(--bg2)' : 'transparent',
  color: active ? 'var(--text)' : 'var(--muted)',
  fontFamily: 'Syne, sans-serif',
  fontWeight: active ? 600 : 400,
  fontSize: 13,
  cursor: 'pointer',
  transition: 'all 0.18s',
  letterSpacing: '0.03em',
})

export default function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('login')       // 'login' | 'register'
  const [checkingSession, setCheckingSession] = useState(true)
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  // Restore session on mount
  useEffect(() => {
    getCurrentUser()
      .then(({ data }) => setUser(data))
      .catch(() => {})
      .finally(() => setCheckingSession(false))
  }, [])

  if (checkingSession) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '2px solid var(--border2)',
          borderTopColor: 'var(--accent)',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  return (
    <>
      <Toast toasts={toasts} remove={removeToast} />

      <div style={card}>

        {/* Logo */}
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <span style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: 'var(--accent)',
            letterSpacing: '-0.02em',
          }}>
            Auth<span style={{ color: 'var(--text)' }}>Flow</span>
          </span>
          {!user && (
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              {view === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </p>
          )}
          {user && (
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              Your profile
            </p>
          )}
        </div>

        {/* Auth Views */}
        {!user && (
          <>
            <div style={tabBar}>
              <button style={tab(view === 'login')} onClick={() => setView('login')}>Sign In</button>
              <button style={tab(view === 'register')} onClick={() => setView('register')}>Register</button>
            </div>

            {view === 'login' ? (
              <LoginForm
                onSuccess={setUser}
                addToast={addToast}
                switchToRegister={() => setView('register')}
              />
            ) : (
              <RegisterForm
                onSuccess={setUser}
                addToast={addToast}
                switchToLogin={() => setView('login')}
              />
            )}
          </>
        )}

        {/* Profile View */}
        {user && (
          <Profile
            user={user}
            onLogout={() => setUser(null)}
            addToast={addToast}
          />
        )}
      </div>
    </>
  )
}
