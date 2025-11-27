import React, { useState } from 'react';
import './App.css';
import './index.css';
import Toast from './components/Toast';

// PUBLIC_INTERFACE
function App() {
  /**
   * Minimal form that triggers a success toast on submit.
   */
  const [formValue, setFormValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('Form submitted successfully');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save changes here. For demo, just show a success toast.
    setToastMsg('Changes saved successfully');
    // Force re-mount so timer restarts on rapid submissions
    setShowToast(false);
    setTimeout(() => setShowToast(true), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mx-auto mt-12 w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="border-b border-primary/10 px-6 py-4">
            <h1 className="text-lg font-semibold text-text">Toast Demo</h1>
            <p className="mt-1 text-sm text-text/70">
              Submit the form to see a top-right success toast with auto-dismiss.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <label htmlFor="name" className="block text-sm font-medium text-text">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            />

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                data-testid="btn-save"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMsg}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
