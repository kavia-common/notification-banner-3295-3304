import React, { useState } from 'react';
import './App.css';
import './index.css';
import { useToast } from './components/ToastContainer';

// PUBLIC_INTERFACE
function App() {
  /**
   * A basic auth-like form with username and password that can:
   * - Save changes (button) -> validates then shows success toast "Changes saved successfully"
   * - Submit form (submit button or Enter) -> validates then shows success toast "Form submitted successfully"
   * - If fields invalid -> shows separate error toasts describing each invalid field
   * Toasts stack at top-right and each auto-dismisses after its own duration
   * (success: 3000ms, error: 5000ms).
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { addToast } = useToast();

  const SUCCESS_DURATION = 3000;
  const ERROR_DURATION = 5000;

  const successToast = (message) => {
    addToast({ message, type: 'success', duration: SUCCESS_DURATION });
  };

  const errorToast = (message) => {
    addToast({ message, type: 'error', duration: ERROR_DURATION });
  };

  // Validate fields and emit toasts for every failure. Returns true if valid.
  const validateAndToast = () => {
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

    if (errors.length > 0) {
      // Emit separate error toasts so they stack
      errors.forEach((msg) => errorToast(msg));
      return false;
    }
    return true;
  };

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAndToast()) return;

    // Normally you would perform auth/submit logic here
    successToast('Form submitted successfully');
  };

  // Save changes handler (non-submit action)
  const handleSaveChanges = () => {
    if (!validateAndToast()) return;

    // Persist draft changes normally; here we only show a toast
    successToast('Changes saved successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mx-auto mt-12 w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-start justify-between border-b border-primary/10 px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold text-text">Toast Demo</h1>
              <p className="mt-1 text-sm text-text/70">
                Use the form below. "Save changes" and submitting the form validate fields.
                Success shows a green toast (3s). Invalid inputs show specific error toasts (5s)
                that stack without overlap.
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
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="mt-2 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                />
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
