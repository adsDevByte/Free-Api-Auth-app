import { useState } from 'react'

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--muted)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    background: 'var(--bg3)',
    border: '1px solid var(--border2)',
    borderRadius: 'var(--radius-sm)',
    padding: '11px 14px',
    color: 'var(--text)',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  eye: {
    position: 'absolute',
    right: 12,
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    cursor: 'pointer',
    fontSize: 16,
    padding: 4,
    lineHeight: 1,
  },
}

export default function Input({ label, type = 'text', value, onChange, placeholder, disabled }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div style={s.wrap}>
      {label && <label style={s.label}>{label}</label>}
      <div style={s.inputWrap}>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            ...s.input,
            paddingRight: isPassword ? 42 : 14,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border2)'}
        />
        {isPassword && (
          <button type="button" style={s.eye} onClick={() => setShow(v => !v)} tabIndex={-1}>
            {show ? '🙈' : '👁'}
          </button>
        )}
      </div>
    </div>
  )
}
