import React, { useMemo, useState } from 'react';
import { useToast } from '../components/ToastContainer';

/**
 * PUBLIC_INTERFACE
 * ToastShowcase
 * Provides buttons to trigger toasts for different types and durations using the ToastContainer API.
 * Multiple toasts stack at the top-right without overlapping.
 */
export default function ToastShowcase() {
  const { addToast } = useToast();

  const presets = useMemo(
    () => [
      { label: 'Success (2s)', type: 'success', duration: 2000, message: 'Operation succeeded' },
      { label: 'Info (3s)', type: 'info', duration: 3000, message: 'Heads up, this is some information' },
      { label: 'Error (5s)', type: 'error', duration: 5000, message: 'Something went wrong' },
      { label: 'Warning (4s)', type: 'warning', duration: 4000, message: 'Please double-check your inputs' },
      { label: 'Neutral (3s)', type: 'neutral', duration: 3000, message: 'General update available' },
    ],
    []
  );

  const [customMsg, setCustomMsg] = useState('Custom toast message');
  const [customDuration, setCustomDuration] = useState(3000);
  const [customType, setCustomType] = useState('info');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <div className="rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4 sm:px-6">
            <div>
              <h1 className="text-lg font-semibold text-text">Toast Showcase</h1>
              <p className="mt-1 text-sm text-text/70">
                Trigger toasts for different variants and durations. Multiple toasts can be queued and will stack.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            >
              ← Back to Form
            </a>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-text shadow ring-1 ring-primary/10 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  onClick={() => addToast({ message: p.message, type: p.type, duration: p.duration })}
                  data-testid={`btn-${p.label.replace(/\s|\(|\)|s/g, '').toLowerCase()}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

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
                    <option value="success">success</option>
                    <option value="error">error</option>
                    <option value="info">info</option>
                    <option value="warning">warning</option>
                    <option value="neutral">neutral</option>
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
                      addToast({ message: customMsg || 'Custom toast', type: customType, duration: dur });
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
              Note: The container manages durations per toast and removes them accordingly. Each toast can be closed manually without affecting others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
