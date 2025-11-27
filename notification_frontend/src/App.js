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
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    if (u && u.length < 3) return 'Must be at least 3 characters';
    return '';
  }, [username]);

  const passwordHint = useMemo(() => {
    const p = password.trim();
    if (p && p.length < 6) return 'Must be at least 6 characters';
    return '';
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid } = computeValidation();

    if (!valid) {
      errorToast('Please fill in the required details', 3000);
      return;
    }

    successToast('Form submitted successfully');
  };

  const handleSaveChanges = () => {
    const { valid, errors } = computeValidation();
    if (!valid) {
      errors.forEach((msg) => errorToast(msg));
      return;
    }

    successToast('Changes saved successfully');
  };

  const hintBaseClasses = 'mt-1 text-xs';
  const hintNeutralClasses = 'text-gray-500';
  const hintErrorClasses = 'text-red-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-start justify-between border-b border-primary/10 px-5 py-4 sm:px-6">
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

          <form onSubmit={handleSubmit} className="px-5 py-5 sm:px-6 sm:py-6">
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
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    aria-describedby="password-hint"
                  />
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

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
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
