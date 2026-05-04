import { useEffect } from 'react'

const styles = {
  wrapper: {
    position: 'fixed',
    top: 24,
    right: 24,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  toast: (type) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 18px',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 500,
    background: type === 'success' ? '#1a2e1e' : type === 'error' ? '#2e1a1a' : '#1e1c18',
    border: `1px solid ${type === 'success' ? '#5a9e6f44' : type === 'error' ? '#c9606044' : '#d4a85344'}`,
    color: type === 'success' ? '#7ec995' : type === 'error' ? '#e08080' : '#f0c870',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    animation: 'slideIn 0.25s ease',
    maxWidth: 320,
  }),
  dot: (type) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    flexShrink: 0,
    background: type === 'success' ? '#5a9e6f' : type === 'error' ? '#c96060' : '#d4a853',
  }),
}

export default function Toast({ toasts, remove }) {
  return (
    <>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div style={styles.wrapper}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} remove={remove} />
        ))}
      </div>
    </>
  )
}

function ToastItem({ toast, remove }) {
  useEffect(() => {
    const timer = setTimeout(() => remove(toast.id), 3500)
    return () => clearTimeout(timer)
  }, [toast.id, remove])

  return (
    <div style={styles.toast(toast.type)} onClick={() => remove(toast.id)}>
      <span style={styles.dot(toast.type)} />
      {toast.message}
    </div>
  )
}
