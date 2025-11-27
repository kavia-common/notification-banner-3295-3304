import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Toast
 * A top-right fixed toast that auto-dismisses after 3000ms with manual close option.
 * Props:
 * - message: string - Toast content to display
 * - onClose: function - callback invoked when toast closes (auto or manual)
 * - type: 'info' | 'success' | 'error' - determines color (default: 'success' for form submit)
 */
export default function Toast({ message, onClose, type = 'success' }) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Auto dismiss after 3s
    timerRef.current = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  // Tailwind-first styles with a simple inline fallback to avoid build config edits
  const colorStyles = {
    info: {
      container: 'ring-primary/30 bg-gradient-to-br from-primary/10 to-surface',
      bar: 'bg-primary',
      text: 'text-text',
    },
    success: {
      container: 'ring-success/30 bg-gradient-to-br from-secondary/10 to-surface',
      bar: 'bg-secondary',
      text: 'text-text',
    },
    error: {
      container: 'ring-error/30 bg-gradient-to-br from-error/10 to-surface',
      bar: 'bg-error',
      text: 'text-text',
    },
  }[type] || {
    container: 'ring-primary/30 bg-gradient-to-br from-primary/10 to-surface',
    bar: 'bg-primary',
    text: 'text-text',
  };

  // Inline fallback (used in addition to Tailwind for environments without Tailwind)
  const fallbackWrapperStyle = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
  };
  const fallbackCardStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    background: '#ffffff',
    padding: '0.75rem 1rem',
    minWidth: '260px',
    maxWidth: '24rem',
    border: '1px solid rgba(37,99,235,0.15)',
  };
  const fallbackBarStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '4px',
    backgroundColor: type === 'error' ? '#EF4444' : type === 'success' ? '#F59E0B' : '#2563EB',
  };
  const fallbackCloseStyle = {
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
      style={fallbackWrapperStyle}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      data-testid="toast-wrapper"
    >
      <div
        className={`relative overflow-hidden rounded-lg shadow-lg ring-1 ${colorStyles.container} backdrop-blur-sm px-4 py-3 min-w-[260px] max-w-sm`}
        style={fallbackCardStyle}
      >
        <span className={`absolute left-0 top-0 h-full w-1 ${colorStyles.bar}`} style={fallbackBarStyle} />
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ${colorStyles.bar} text-white`}
            aria-hidden="true"
          >
            {type === 'success' ? '✓' : type === 'error' ? '!' : 'ℹ️'}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${colorStyles.text}`} data-testid="toast-message">
              {message}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close toast"
            onClick={onClose}
            className="ml-2 inline-flex items-center justify-center rounded-md p-1 text-text/70 hover:text-text transition-colors"
            style={fallbackCloseStyle}
            data-testid="toast-close"
          >
            ✕
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
