import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Toast
 * A single toast card (no fixed positioning). Meant to be rendered inside a ToastContainer
 * that handles stacking and placement. Provides enter/exit transitions and manual close.
 *
 * Props:
 * - message: string - content to display
 * - onClose: function - called after exit when user closes
 * - type: 'info' | 'success' | 'error' | 'warning' | 'neutral'
 */
export default function Toast({ message, onClose, type = 'info' }) {
  const [visible, setVisible] = useState(true);

  // Ocean Professional themed variants using Tailwind utilities
  const variants = {
    success: { ring: 'ring-success/30', bar: 'bg-success', text: 'text-text', iconBg: 'bg-success' },
    error: { ring: 'ring-error/30', bar: 'bg-error', text: 'text-text', iconBg: 'bg-error' },
    info: { ring: 'ring-primary/30', bar: 'bg-primary', text: 'text-text', iconBg: 'bg-primary' },
    warning: { ring: 'ring-amber-300', bar: 'bg-amber-500', text: 'text-text', iconBg: 'bg-amber-500' },
    neutral: { ring: 'ring-gray-300', bar: 'bg-gray-500', text: 'text-text', iconBg: 'bg-gray-500' },
  };
  const v = variants[type] || variants.info;

  const icon =
    type === 'success' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 111.414-1.414l3.101 3.101 6.364-6.364a1 1 0 011.535.02z"
          clipRule="evenodd"
        />
      </svg>
    ) : type === 'error' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm3.536 12.95a1 1 0 11-1.415 1.414L12 13.243l-2.122 2.122a1 1 0 01-1.415-1.414L10.586 11.83 8.463 9.707a1 1 0 011.415-1.414L12 10.415l2.121-2.122a1 1 0 111.415 1.414L13.415 11.83z"
          clipRule="evenodd"
        />
      </svg>
    ) : type === 'warning' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1zm0 8a1.25 1.25 0 111.25-1.25A1.25 1.25 0 0112 17z" />
      </svg>
    ) : type === 'neutral' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M18 10A8 8 0 11.001 9.999 8 8 0 0118 10zM9 9h2v5H9V9zm0-3h2v2H9V6z" />
      </svg>
    );

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      data-testid="toast-wrapper"
      className={[
        // Card shell
        'relative overflow-hidden rounded-lg bg-surface ring-1 shadow-md',
        v.ring,
        'px-4 py-3 min-w-[260px] max-w-sm',
        // Motion
        'transition-all duration-200 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5',
      ].join(' ')}
      // keep a minimal inline fallback border radius/shadow in case Tailwind fails
      style={{ borderRadius: 12 }}
    >
      {/* Left accent bar */}
      <span className={['absolute left-0 top-0 h-full w-1', v.bar].join(' ')} />

      <div className="flex items-start gap-3">
        <div className={['mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-white', v.iconBg].join(' ')} aria-hidden="true">
          {icon}
        </div>

        <div className="flex-1">
          <p className={['text-sm', v.text].join(' ')} data-testid="toast-message">
            {message}
          </p>
        </div>

        <button
          type="button"
          aria-label="Close toast"
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose && onClose(), 200);
          }}
          className="ml-2 inline-flex items-center justify-center rounded-md p-1 text-text/70 hover:text-text transition-colors"
          data-testid="toast-close"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning', 'neutral']),
};
