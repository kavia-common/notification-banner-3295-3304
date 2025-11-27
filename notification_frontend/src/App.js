import React, { useState } from 'react';
import './App.css';
import './index.css';
import Notification from './components/Notification';

// PUBLIC_INTERFACE
function App() {
  /**
   * Demo app state to show notifications.
   */
  const [message, setMessage] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [notifType, setNotifType] = useState('info');

  const samples = [
    { msg: 'Settings saved successfully.', type: 'success' },
    { msg: 'New message received.', type: 'info' },
    { msg: 'An error occurred. Please try again.', type: 'error' }
  ];

  const handleShowCustom = () => {
    if (!message.trim()) {
      setNotifType('error');
      setMessage('Please enter a message first.');
    } else {
      setNotifType('info');
    }
    setShowNotif(false);
    // trigger a re-render to ensure re-mount for auto-dismiss
    setTimeout(() => setShowNotif(true), 0);
  };

  const handleShowRandom = () => {
    const pick = samples[Math.floor(Math.random() * samples.length)];
    setMessage(pick.msg);
    setNotifType(pick.type);
    setShowNotif(false);
    setTimeout(() => setShowNotif(true), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mx-auto mt-12 w-full max-w-lg rounded-2xl bg-surface shadow-md ring-1 ring-primary/10">
          <div className="border-b border-primary/10 px-6 py-4">
            <h1 className="text-lg font-semibold text-text">Notification Demo</h1>
            <p className="mt-1 text-sm text-text/70">
              Ocean Professional theme · Blue accents with amber highlights
            </p>
          </div>

          <div className="px-6 py-6">
            <label htmlFor="message" className="block text-sm font-medium text-text">
              Message
            </label>
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a custom notification message..."
              className="mt-2 w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            />

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleShowCustom}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                data-testid="btn-show-custom"
              >
                Show Custom
              </button>

              <button
                onClick={handleShowRandom}
                className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-amber-500/90 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
                data-testid="btn-show-random"
              >
                Show Random
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNotif && (
        <Notification
          message={message}
          type={notifType}
          onClose={() => setShowNotif(false)}
        />
      )}
    </div>
  );
}

export default App;
