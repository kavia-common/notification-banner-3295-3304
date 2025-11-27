import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Toast
 * Polished top-right toast with variants (success, error, info), icons, auto-dismiss (3s), and manual close.
 * Props:
 * - message: string - Toast content to display
 * - onClose: function - callback invoked when toast closes (auto or manual)
 * - type: 'info' | 'success' | 'error' - determines color and icon (default: 'info')
 * Accessibility:
 * - role is 'alert' for error, 'status' otherwise
 * - aria-live="polite"
 */
export default function Toast({ message, onClose, type = 'info' }) {
  const timerRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto dismiss after 3s
    timerRef.current = setTimeout(() => {
      // animate exit then call onClose
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 200); // match transition duration
    }, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  // Tailwind-first styles with Ocean Professional accents and a small left accent bar.
  // Also provide inline fallback styles for non-Tailwind environments.
  const variants = {
    success: {
      ring: 'ring-green-200',
      bar: 'bg-green-500',
      text: 'text-gray-900',
      iconBg: 'bg-green-500',
    },
    error: {
      ring: 'ring-red-200',
      bar: 'bg-red-500',
      text: 'text-gray-900',
      iconBg: 'bg-red-500',
    },
    info: {
      ring: 'ring-blue-200',
      bar: 'bg-blue-500',
      text: 'text-gray-900',
      iconBg: 'bg-blue-500',
    },
  };
  const v = variants[type] || variants.info;

  const icon = type === 'success'
    ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 111.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z" clipRule="evenodd" />
      </svg>
    )
    : type === 'error'
      ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm3.536 12.95a1 1 0 11-1.415 1.414L12 13.243l-2.122 2.122a1 1 0 01-1.415-1.414L10.586 11.83 8.463 9.707a1 1 0 011.415-1.414L12 10.415l2.121-2.122a1 1 0 111.415 1.414L13.415 11.83z" clipRule="evenodd"/>
        </svg>
      )
      : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M18 10A8 8 0 11.001 9.999 8 8 0 0118 10zM9 9h2v5H9V9zm0-3h2v2H9V6z" />
        </svg>
      );

  // Inline fallback for non-Tailwind environments
  const wrapperStyle = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
    transform: visible ? 'translateY(0)' : 'translateY(-6px)',
    opacity: visible ? 1 : 0,
    transition: 'opacity 200ms ease, transform 200ms ease',
  };
  const cardStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)',
    background: '#fff',
    padding: '0.75rem 1rem',
    minWidth: '260px',
    maxWidth: '24rem',
    border: `1px solid ${type === 'error' ? 'rgba(239,68,68,.3)' : type === 'success' ? 'rgba(34,197,94,.25)' : 'rgba(59,130,246,.25)'}`,
  };
  const barStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '4px',
    backgroundColor: type === 'error' ? '#EF4444' : type === 'success' ? '#22C55E' : '#3B82F6',
  };
  const closeStyle = {
    marginLeft: '0.5rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#374151',
    fontSize: '14px',
  };

  return (
    <div
      className="fixed top-4 right-4 z-50"
      style={wrapperStyle}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      data-testid="toast-wrapper"
    >
      <div
        className={[
          'relative overflow-hidden rounded-lg shadow-lg ring-1 bg-white',
          v.ring,
          'px-4 py-3 min-w-[260px] max-w-sm',
          'transition transform duration-200 ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5',
        ].join(' ')}
        style={cardStyle}
      >
        {/* left accent bar */}
        <span className={['absolute left-0 top-0 h-full w-1', v.bar].join(' ')} style={barStyle} />
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={['mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-white', v.iconBg].join(' ')}
            aria-hidden="true"
          >
            {icon}
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className={['text-sm', v.text].join(' ')} data-testid="toast-message">
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            aria-label="Close toast"
            onClick={() => {
              setVisible(false);
              setTimeout(() => onClose && onClose(), 200);
            }}
            className="ml-2 inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-gray-800 transition-colors"
            style={closeStyle}
            data-testid="toast-close"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['info', 'success', 'error']),
};
