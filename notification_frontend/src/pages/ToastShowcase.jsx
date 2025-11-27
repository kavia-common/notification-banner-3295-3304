import React, { useCallback, useMemo, useRef, useState } from 'react';
import Toast from '../components/Toast';

/**
 * PUBLIC_INTERFACE
 * ToastShowcase
 * A small demo page with buttons to trigger toasts for success, error, and info variants
 * and support for multiple durations (e.g., 2s, 3s, 5s). Also includes a simple custom
 * message + duration form.
 *
 * Behavior:
 * - Multiple toasts can be triggered. Since the Toast component is single-instance UI,
 *   we render a stack of toasts using a queue (array) and remove each on close.
 * - If desired, rapidly re-triggering simply pushes to the queue; each toast closes itself after
 *   its own duration (passed down via props by causing Toast to unmount when finished).
 *
 * Notes:
 * - We reuse the existing Toast component, which auto-dismisses after 3s internally. To support
 *   custom durations, we manage per-item timers in this page and close/remove the toast at the
 *   desired time. Closing triggers unmount which is the same effect.
 */

/**
 * A toast item record for local queue.
 * @typedef {Object} ToastItem
 * @property {string} id - unique id
 * @property {string} message - toast text
 * @property {'info'|'success'|'error'} type - toast type
 * @property {number} duration - milliseconds to keep toast open
 */

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ToastShowcase() {
  const [queue, setQueue] = useState(
    /** @type {ToastItem[]} */([])
  );

  // Keep timeout handles so we can clear on unmount/remove
  const timersRef = useRef(new Map());

  const scheduleRemoval = useCallback((id, duration) => {
    // Clear existing timer if any
    if (timersRef.current.has(id)) {
      clearTimeout(timersRef.current.get(id));
    }
    const handle = setTimeout(() => {
      // Remove item by id
      setQueue((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, duration);
    timersRef.current.set(id, handle);
  }, []);

  const pushToast = useCallback((message, type, duration) => {
    const id = uid();
    const item = { id, message, type, duration };
    setQueue((prev) => [...prev, item]);
    scheduleRemoval(id, duration);
  }, [scheduleRemoval]);

  const handleClose = useCallback((id) => {
    // Manual close: cancel timer and remove immediately
    const handle = timersRef.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timersRef.current.delete(id);
    }
    setQueue((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Preset buttons
  const presets = useMemo(() => ([
    { label: 'Success (2s)', type: 'success', duration: 2000, message: 'Operation succeeded' },
    { label: 'Info (3s)', type: 'info', duration: 3000, message: 'Heads up, this is some information' },
    { label: 'Error (5s)', type: 'error', duration: 5000, message: 'Something went wrong' },
  ]), []);

  // Custom form state
  const [customMsg, setCustomMsg] = useState('Custom toast message');
  const [customDuration, setCustomDuration] = useState(3000);
  const [customType, setCustomType] = useState('info');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-center justify-between border-b border-primary/10 px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold text-text">Toast Showcase</h1>
              <p className="mt-1 text-sm text-text/70">
                Trigger toasts for different variants and durations. Multiple toasts can be queued.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            >
              ← Back to Form
            </a>
          </div>

          <div className="px-6 py-6">
            {/* Preset buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-text shadow ring-1 ring-primary/10 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  onClick={() => pushToast(p.message, p.type, p.duration)}
                  data-testid={`btn-${p.label.replace(/\s|\(|\)|s/g, '').toLowerCase()}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom section */}
            <div className="mt-8 rounded-xl border border-primary/10 bg-white p-4">
              <h2 className="text-sm font-semibold text-text">Custom toast</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label htmlFor="custom-message" className="block text-xs font-medium text-text/80">
                    Message
                  </label>
                  <input
                    id="custom-message"
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Enter custom message"
                    className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    aria-label="Custom toast message"
                  />
                </div>

                <div>
                  <label htmlFor="custom-type" className="block text-xs font-medium text-text/80">
                    Type
                  </label>
                  <select
                    id="custom-type"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  >
                    <option value="info">info</option>
                    <option value="success">success</option>
                    <option value="error">error</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="custom-duration" className="block text-xs font-medium text-text/80">
                    Duration (ms)
                  </label>
                  <input
                    id="custom-duration"
                    type="number"
                    min={500}
                    step={500}
                    value={customDuration}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    aria-label="Custom toast duration"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const dur = Number(customDuration) || 3000;
                      pushToast(customMsg || 'Custom toast', customType, dur);
                    }}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white shadow hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition"
                    data-testid="btn-custom-toast"
                  >
                    Show custom toast
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-text/60">
              Note: The showcase manages durations per toast and removes them accordingly. The Toast component
              itself auto-dismisses after ~3s internally; early removal causes it to unmount, matching expected behavior.
            </p>
          </div>
        </div>
      </div>

      {/* Render a stack of toasts; each item manages its own lifecycle via timers above. */}
      <div aria-live="polite" aria-relevant="additions removals">
        {queue.map((item) => (
          <Toast
            key={item.id}
            message={item.message}
            type={item.type}
            onClose={() => handleClose(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
