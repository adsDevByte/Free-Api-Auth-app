const s = {
  btn: (variant, loading) => ({
    width: '100%',
    padding: '12px 20px',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: '0.04em',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    transition: 'all 0.18s',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...(variant === 'primary' ? {
      background: 'var(--accent)',
      color: '#0f0e0c',
    } : variant === 'danger' ? {
      background: 'transparent',
      border: '1px solid #c9606044',
      color: 'var(--red)',
    } : {
      background: 'var(--bg3)',
      border: '1px solid var(--border2)',
      color: 'var(--text)',
    }),
  }),
}

export default function Button({ children, onClick, variant = 'primary', loading, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={s.btn(variant, loading)}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.85' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = loading ? '0.7' : '1' }}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span style={{
        width: 14, height: 14,
        border: '2px solid rgba(0,0,0,0.2)',
        borderTopColor: '#0f0e0c',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        flexShrink: 0,
      }} />
    </>
  )
}
