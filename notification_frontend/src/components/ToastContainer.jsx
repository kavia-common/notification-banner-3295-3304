import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from './Toast';

/**
 * PUBLIC_INTERFACE
 * ToastContainerContext
 * Provides addToast and removeToast functions to children.
 */
const ToastContainerContext = createContext({
  addToast: (_opts) => {},
  removeToast: (_id) => {}
});

/**
 * PUBLIC_INTERFACE
 * useToast
 * Hook to access toast API.
 */
export function useToast() {
  return useContext(ToastContainerContext);
}

/**
 * PUBLIC_INTERFACE
 * ToastContainer
 * Fixed top-right container that stacks multiple Toasts vertically with gap.
 * Exposes addToast({ message, type, duration }) to push toasts.
 *
 * Props:
 * - children: ReactNode - application subtree that can call useToast()
 */
export default function ToastContainer({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    // Cancel any pending timer
    const handle = timersRef.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const item = { id, message, type, duration };
    setToasts((prev) => [...prev, item]);

    // auto removal timer based on provided duration
    const handle = setTimeout(() => {
      removeToast(id);
    }, Math.max(0, duration));
    timersRef.current.set(id, handle);

    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContainerContext.Provider value={value}>
      {children}
      {/* Fixed top-right stack container */}
      <div
        className="pointer-events-none fixed top-4 right-4 z-50 flex max-w-full flex-col items-end gap-3 sm:max-w-xs md:max-w-sm"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-relevant="additions removals"
        data-testid="toast-container"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              message={t.message}
              type={t.type}
              // Toast still has its own internal micro exit animation. We rely on our timers for duration,
              // but allow manual close to remove this one without affecting others.
              onClose={() => removeToast(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContainerContext.Provider>
  );
}

ToastContainer.propTypes = {
  children: PropTypes.node
};
