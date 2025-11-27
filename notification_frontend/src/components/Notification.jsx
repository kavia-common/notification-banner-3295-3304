import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Notification
 * A top-right fixed notification that auto-dismisses after 3000ms.
 * Props:
 * - message: string - Notification text to display
 * - type: 'info' | 'success' | 'error' - determines the color style (default: 'info')
 * - onClose: function - callback invoked when notification closes (auto or manual)
 */
export default function Notification({ message, type = 'info', onClose }) {
  const timerRef = useRef(null);

  // Determine color classes based on type
  const colorMap = {
    info: {
      ring: 'ring-primary/30',
      bg: 'from-primary/10 to-surface',
      bar: 'bg-primary',
      text: 'text-text'
    },
    success: {
      ring: 'ring-success/30',
      bg: 'from-secondary/10 to-surface',
      bar: 'bg-secondary',
      text: 'text-text'
    },
    error: {
      ring: 'ring-error/30',
      bg: 'from-error/10 to-surface',
      bar: 'bg-error',
      text: 'text-text'
    }
  };

  const styles = colorMap[type] || colorMap.info;

  useEffect(() => {
    // start auto-dismiss timer
    timerRef.current = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    // cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      data-testid="notification-wrapper"
    >
      <div
        className={`
          relative overflow-hidden
          rounded-lg shadow-lg
          ring-1 ${styles.ring}
          bg-gradient-to-br ${styles.bg}
          backdrop-blur-sm
          px-4 py-3
          min-w-[260px] max-w-sm
          transition-transform duration-300 ease-out
          animate-[fadeIn_200ms_ease-out]
        `}
      >
        {/* left color bar */}
        <span className={`absolute left-0 top-0 h-full w-1 ${styles.bar}`} />

        <div className="flex items-start gap-3">
          {/* Icon bubble */}
          <div
            className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ${styles.bar} text-white`}
            aria-hidden="true"
          >
            {type === 'success' ? '✓' : type === 'error' ? '!' : 'ℹ️'}
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className={`text-sm ${styles.text}`} data-testid="notification-message">
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            aria-label="Close notification"
            onClick={onClose}
            className="ml-2 inline-flex items-center justify-center rounded-md p-1 text-text/70 hover:text-text transition-colors"
            data-testid="notification-close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error']),
  onClose: PropTypes.func
};
