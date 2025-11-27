import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { useToast } from './components/ToastContainer';

// PUBLIC_INTERFACE
function App() {
  /**
   * A basic auth-like form with username and password that can:
   * - Save changes (button) -> validates then shows success toast "Changes saved successfully"
   * - Submit form (submit button or Enter) -> validates then shows success toast "Form submitted successfully"
   * - On Save changes: invalid fields show separate error toasts, valid shows success (unchanged)
   * - On Submit: if invalid, show exactly one toast "Please fill in the required details" for 3000ms
   * Toasts stack at top-right, managed by ToastContainer durations.
   *
   * Enhanced per task:
   * - Inline, live-updating hints below fields (no extra toasts)
   * - Show/hide toggle for password visibility
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();

  const SUCCESS_DURATION = 3000;
  const ERROR_DURATION = 5000;

  const successToast = (message) => {
    addToast({ message, type: 'success', duration: SUCCESS_DURATION });
  };

  const errorToast = (message, duration = ERROR_DURATION) => {
    addToast({ message, type: 'error', duration });
  };

  // PUBLIC_INTERFACE
  const computeValidation = () => {
    /** Compute validity and collect errors for Save/Submit toasts (no side effects). */
    const errors = [];
    const u = username.trim();
    const p = password.trim();

    if (!u) {
      errors.push('Username is required');
    } else if (u.length < 3) {
      errors.push('Username must be at least 3 characters');
    }

    if (!p) {
      errors.push('Password is required');
    } else if (p.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    return { valid: errors.length === 0, errors };
  };

  // Live hint messages based on current values (no toasts)
  const usernameHint = useMemo(() => {
    const u = username.trim();
    if (!u) return 'Required';
    if (u.length < 3) return 'Must be at least 3 characters';
    return ''; // no hint when valid
  }, [username]);

  const passwordHint = useMemo(() => {
    const p = password.trim();
    if (!p) return 'Required';
    if (p.length < 6) return 'Must be at least 6 characters';
    return ''; // no hint when valid
  }, [password]);

  // Submit form handler: single invalid toast if invalid, success on valid.
  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid } = computeValidation();

    if (!valid) {
      // Exactly one toast, 3000ms, error type as appropriate
      errorToast('Please fill in the required details', 3000);
      return;
    }

    successToast('Form submitted successfully');
  };

  // Save changes handler (non-submit action): keep existing behavior (field-specific toasts).
  const handleSaveChanges = () => {
    const { valid, errors } = computeValidation();
    if (!valid) {
      // Emit separate error toasts so they stack (existing behavior)
      errors.forEach((msg) => errorToast(msg));
      return;
    }

    successToast('Changes saved successfully');
  };

  // Basic styles for inline hints (Tailwind if available; inline fallback included)
  const hintBaseClasses = 'mt-1 text-xs';
  const hintNeutralClasses = 'text-gray-500'; // neutral info
  const hintErrorClasses = 'text-red-600'; // error

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mx-auto mt-12 w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-start justify-between border-b border-primary/10 px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold text-text">Toast Demo</h1>
              <p className="mt-1 text-sm text-text/70">
                Use the form below. "Save changes" and submitting the form validate fields.
                Save shows detailed invalid toasts; Submit shows a single invalid toast. Success shows a green toast.
              </p>
            </div>
            <a
              href="/toast-showcase"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            >
              Open Toast Showcase →
            </a>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-text">
                  Username <span aria-hidden="true" className="text-red-600">*</span>
                  <span className="sr-only">required</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="mt-2 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  aria-describedby="username-hint"
                />
                {usernameHint && (
                  <p
                    id="username-hint"
                    className={`${hintBaseClasses} ${username.trim().length === 0 || username.trim().length < 3 ? hintErrorClasses : hintNeutralClasses}`}
                    style={{ color: (!username || username.trim().length < 3) ? '#dc2626' : '#6b7280' }}
                    role="status"
                    aria-live="polite"
                  >
                    {usernameHint}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text">
                  Password <span aria-hidden="true" className="text-red-600">*</span>
                  <span className="sr-only">required</span>
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 pr-20 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    aria-describedby="password-hint"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 my-auto h-8 w-8 inline-flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    data-testid="btn-toggle-password"
                    style={{
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {showPassword ? (
                      // Eye-off icon
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.58 10.58a2 2 0 102.83 2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.88 4.24A9.77 9.77 0 0112 4c5 0 9.27 3.11 11 7.5a12.37 12.37 0 01-2.05 3.29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.61 6.61C4.3 8.07 2.64 10.08 1 11.5c1.73 4.39 6 7.5 11 7.5 1.49 0 2.92-.26 4.23-.74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      // Eye icon
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                {passwordHint && (
                  <p
                    id="password-hint"
                    className={`${hintBaseClasses} ${password.trim().length === 0 || password.trim().length < 6 ? hintErrorClasses : hintNeutralClasses}`}
                    style={{ color: (!password || password.trim().length < 6) ? '#dc2626' : '#6b7280' }}
                    role="status"
                    aria-live="polite"
                  >
                    {passwordHint}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                data-testid="btn-save"
              >
                Save changes
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white shadow hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition"
                data-testid="btn-submit"
              >
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
