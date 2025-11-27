import React, { useState } from 'react';
import './App.css';
import './index.css';
import Toast from './components/Toast';

// PUBLIC_INTERFACE
function App() {
  /**
   * A basic auth-like form with username and password that can:
   * - Save changes (button) -> shows success toast "Changes saved successfully"
   * - Submit form (submit button or Enter) -> shows success toast "Form submitted successfully"
   * - If fields are empty on submit -> shows error toast "Please fill in all fields"
   * Toast auto-dismisses after 3s and has a manual close button, implemented in Toast component.
   */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('Form submitted successfully');
  const [toastType, setToastType] = useState('info');

  // Helper to show toast and restart its 3s timer by remounting
  const triggerToast = (message, type = 'info') => {
    setToastMsg(message);
    setToastType(type);
    setShowToast(false);
    setTimeout(() => setShowToast(true), 0);
  };

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      triggerToast('Please fill in all fields', 'error');
      return;
    }
    // Normally you would perform auth/submit logic here
    triggerToast('Form submitted successfully', 'success');
  };

  // Save changes handler (non-submit action)
  const handleSaveChanges = () => {
    // Persist draft changes normally; here we only show a toast
    triggerToast('Changes saved successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mx-auto mt-12 w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="flex items-start justify-between border-b border-primary/10 px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold text-text">Toast Demo</h1>
              <p className="mt-1 text-sm text-text/70">
                Use the form below. "Save changes" shows a success toast. Submitting the form shows success when valid or an error if fields are empty. Auto-dismiss after 3 seconds.
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

      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
